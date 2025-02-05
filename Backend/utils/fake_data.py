from faker import Faker

fake = Faker()

def generate_sample_text(word_count):
    """Generate sample text with the specified word count using Faker."""
    words = []  # Start with an empty list to store words

    # Add random words to the list one by one
    for _ in range(word_count):
        word = fake.word()  # Get a random word
        words.append(word)  # Add the word to the list

    # Join all the words into a single string with spaces in between
    text = " ".join(words)

    return text