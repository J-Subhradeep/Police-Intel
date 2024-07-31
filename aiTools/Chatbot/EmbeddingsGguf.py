from generate_embeddings import EmbeddingGenerator

generator = EmbeddingGenerator()
generator.generate_embeddings('./Datasets/Chatbot Dataset v3.csv', './GGUFfaiss_db', 'myGGUFIndex')