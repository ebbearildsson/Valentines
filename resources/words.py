import time
dict_one_step = {}

def get_neighbors(word):
    words = []
    for i in range(len(word)):
            keys = set(dict_one_step.keys())
            for c in 'abcdefghijklmnopqrstuvwxyz':
                new_word = word[:i] + c + word[i+1:]
                if new_word in keys and new_word != word:
                    words.append(new_word)
    return words

def bfs(start, goal, solution_limit=1):
    from collections import deque

    queue = deque([[start]])
    visited = set()

    while queue:
        path = queue.popleft()
        word = path[-1]

        if word == goal:
            solution_limit -= 1
            print(" -> ".join(path))
            if solution_limit <= 0:
                return path

        if word not in visited:
            visited.add(word)
            neighbors = dict_one_step.get(word, [])
            if not neighbors:
                neighbors = get_neighbors(word)
                dict_one_step[word] = neighbors
            for neighbor in neighbors:
                if neighbor in visited:
                    continue
                new_path = list(path)
                new_path.append(neighbor)
                queue.append(new_path)
    return None

def get_inputs():
    first = ""
    last = "something"
    while len(first) != len(last):
        first = input("Enter the first word: ")
        last = input("Enter the last word: ")
    return first, last, len(first)

def read_processed():
    with open("resources/words.processed", "r") as f:
        for line in f:
            key, value = line.strip().split(": ")
            dict_one_step[key] = value.split(", ")

if __name__ == "__main__":
    read_processed()

    while True:
        first, last, length = get_inputs()
        start_time = time.time()
        ladder = bfs(first, last, 20)
        end_time = time.time()
        print(f"Time taken: {end_time - start_time:.2f} seconds")