import { NextRequest, NextResponse } from 'next/server';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { OpenAIEmbeddings } from '@langchain/openai';
import { SentenceTransformerEmbeddings } from '@langchain/community/embeddings/sentence_transformer';
import { Pinecone as PineconeClient } from '@pinecone-database/pinecone';
import { PineconeStore } from '@langchain/community/vectorstores/pinecone';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];
    const embedder = formData.get('embedder') as string || 'proprietary';

    let embeddings;
    if (embedder === 'proprietary') {
      embeddings = new OpenAIEmbeddings({ model: 'text-embedding-ada-002' });
    } else {
      embeddings = new SentenceTransformerEmbeddings({ modelName: 'all-MiniLM-L6-v2' });
    }

    const pc = new PineconeClient({ apiKey: process.env.PINECONE_API_KEY });
    const index = pc.index(process.env.PINECONE_INDEX_NAME || 'eduai-index');

    const docs = [];
    for (const file of files) {
      const buffer = await file.arrayBuffer();
      const loader = new PDFLoader(new Blob([buffer]));
      const loadedDocs = await loader.load();
      docs.push(...loadedDocs);
    }

    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });
    const splitDocs = await splitter.splitDocuments(docs);

    await PineconeStore.fromDocuments(splitDocs, embeddings, { pineconeIndex: index });

    return NextResponse.json({ message: 'Documents uploaded and vectorized to Pinecone' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to upload and process PDFs' }, { status: 500 });
  }
}
