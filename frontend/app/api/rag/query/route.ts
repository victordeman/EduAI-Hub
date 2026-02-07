import { NextRequest, NextResponse } from 'next/server';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { OpenAIEmbeddings } from '@langchain/openai';
import { FAISS } from 'langchain/vectorstores/faiss';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { v4 as uuidv4 } from 'uuid';

// In-memory store for demo (use Pinecone for production)
const vectorStores: Record<string, FAISS> = {};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];

    const embeddings = new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY });

    const docs = [];
    for (const file of files) {
      const buffer = await file.arrayBuffer();
      const loader = new PDFLoader(new Blob([buffer]));
      const loadedDocs = await loader.load();
      docs.push(...loadedDocs);
    }

    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });
    const splitDocs = await splitter.splitDocuments(docs);

    const vectorStore = await FAISS.fromDocuments(splitDocs, embeddings);
    const storeId = uuidv4();
    vectorStores[storeId] = vectorStore;

    return NextResponse.json({ storeId, message: 'Documents uploaded and vectorized' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to upload and process PDFs' }, { status: 500 });
  }
}
