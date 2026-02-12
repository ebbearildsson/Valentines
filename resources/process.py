dict_one_step = {}
WORDS = set()

def get_neighbors(word):
    words = []
    for i in range(len(word)):
            for c in 'abcdefghijklmnopqrstuvwxyz':
                new_word = word[:i] + c + word[i+1:]
                if new_word in WORDS and new_word != word:
                    words.append(new_word)
    
    if words:
        dict_one_step[word] = words

def preprocess():
    for word in WORDS:
        get_neighbors(word)

if __name__ == "__main__":
    with open("resources/words.txt", "r") as f:
        WORDS = set(line.strip() for line in f.readlines())
    
    import time
    start_time = time.time()
    preprocess()
    print(f"Preprocessing took {time.time() - start_time:.2f} seconds")

    with open("resources/words.processed", "w") as f:
        for key, value in dict_one_step.items():
            f.write(f"{key}: {', '.join(value)}\n")
        