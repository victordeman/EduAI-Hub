import { NextRequest, NextResponse } from 'next/server';
import { ChatOpenAI } from '@langchain/openai';
import { HuggingFaceHub } from '@langchain/huggingface';
import { Ollama } from '@langchain/community/llms/ollama';
import { RetrievalQAChain } from 'langchain/chains';
import { Pinecone as PineconeClient } from '@pinecone-database/pinecone';
import { PineconeStore } from '@langchain/community/vectorstores/pinecone';
import { OpenAIEmbeddings } from '@langchain/openai'; 

export async function POST(req: NextRequest) {
  try {
    const { query, llm: llmModel } = await req.json();

    const pc = new PineconeClient({ apiKey: process.env.PINECONE_API_KEY });
    const index = pc.index(process.env.PINECONE_INDEX_NAME || 'eduai-index');

    const embeddings = new OpenAIEmbeddings(); 

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, { pineconeIndex: index });

    let llm;
    if (llmModel.startsWith('gpt') || llmModel.startsWith('claude') || llmModel.startsWith('gemini')) {
      llm = new ChatOpenAI({ model: llmModel });
    } else if (llmModel.includes('mixtral') || llmModel.includes('qwen') || llmModel.includes('command')) {
      llm = new HuggingFaceHub({ repoId: llmModel, token: process.env.HUGGINGFACEHUB_API_TOKEN });
    } else {
      llm = new Ollama({ model: llmModel, baseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434' });
    }

    const chain = RetrievalQAChain.fromLLM(llm, vectorStore.asRetriever());

    const response = await chain.invoke({ query });

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
