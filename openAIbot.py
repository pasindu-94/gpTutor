import configparser

from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.prompts import PromptTemplate
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA

# Get OpenAI Key Retrieval
config = configparser.ConfigParser()
config.read('config.ini')
openai_api_key = config['SECRETS']['openai_api_key']

embeddings = OpenAIEmbeddings(openai_api_key=openai_api_key)
def documentEmbedding(path):
    loader = PyPDFLoader(path)
    pages = loader.load_and_split()

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500,
                                                   chunk_overlap=0,
                                                   length_function=len,
                                                   separators=['\n\n', '\n', '.'],
                                                   add_start_index=True,
                                                   )

    text_chunks = text_splitter.split_documents(pages)
    retriever = Chroma.from_documents(text_chunks, embeddings, persist_directory="chroma_db")
    return retriever

def getEmbeddings():
    retriever = Chroma(persist_directory="chroma_db", embedding_function=embeddings)
    return retriever

def promptEngineering():

    prompt_template = """Use the following pieces of CONTEXT to answer the question at the end and give the explanation \
    as you are explaining to a High School Student. \
    Do not answer anything outside the CONTEXT given. If you don't know the answer, just say that you don't know, don't try to make up an answer.\
    If answer contain a list, output as a bulleted or numbered list. If answer contain a table return as tab delimited.

    CONTEXT: {context}

    Question: {question}
    Answer:"""

    PROMPT = PromptTemplate(
        template=prompt_template, input_variables=["context", "question"]
    )

    chain_type_kwargs = {"prompt": PROMPT}

    MODEL = "gpt-3.5-turbo"

    chat_llm = ChatOpenAI(model=MODEL,
                          temperature=0,
                          max_tokens=200,
                          openai_api_key=openai_api_key,
                          verbose=True)

    retriever = getEmbeddings()

    qa = RetrievalQA.from_chain_type(llm=chat_llm,
                                     chain_type="stuff",
                                     retriever=retriever.as_retriever(),
                                     chain_type_kwargs=chain_type_kwargs,
                                     return_source_documents=True)

    return qa

def generateResponse(question):
    qa = promptEngineering()

    if question and openai_api_key:
        result = qa({"query": question})
        print(result['result'])

        return result['result']
