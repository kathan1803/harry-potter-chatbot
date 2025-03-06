from backend.chat_with_groq import chat_with_model

def main():
    print("Welcome to the Harry Potter Chatbot! Type 'exit' to quit.")
    
    while True:
        user_input = input("\nYou: ")
        
        if user_input.lower() in ["exit", "quit"]:
            print("Goodbye!")
            break
        
        response = chat_with_model(user_input)
        print("\nBot:", response)

if __name__ == "__main__":
    main()