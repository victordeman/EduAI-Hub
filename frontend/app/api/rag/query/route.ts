import { NextRequest, NextResponse } from 'next/server';
import { ChatOpenAI } from '@langchain/openai';
import { RetrievalQAChain } from 'langchain/chains';
import { Pinecone as PineconeClient } from '@pinecone-database/pinecone';
import { PineconeStore } from '@langchain/community/vectorstores/pinecone';
import { OpenAIEmbeddings } from '@langchain/openai';  // Use same embedder as upload for retrieval

export async function POST(req: NextRequest) {
  try {
    const { query, llm: llmModel } = await req.json();

    const pc = new PineconeClient({ apiKey: process.env.PINECONE_API_KEY });
    const index = pc.index(process.env.PINECONE_INDEX_NAME || 'eduai-index');

    const embeddings = new OpenAIEmbeddings();  // Or match upload embedder; assume consistent

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, { pineconeIndex: index });

    const llm = new ChatOpenAI({ model: llmModel || 'gpt-4o' });  // For local, replace with HuggingFaceHub or local model

    const chain = RetrievalQAChain.fromLLM(llm, vectorStore.asRetriever());

    const response = await chain.invoke({ query });

    // Parse citations (assume metadata has page/source)
    const citations = response.sourceDocuments?.map((doc: any) => ({
      page: doc.metadata.page || 'unknown',
      excerpt: doc.pageContent.substring(0, 100) + '...',
    })) || [];

    return NextResponse.json({ answer: response.result, citations });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to query RAG' }, { status: 500 });
  }
}
