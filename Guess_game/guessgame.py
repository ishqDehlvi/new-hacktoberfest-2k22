import random
num = random.randint(1,50)


print('Welcome to GUESS ME! ')
print('I am thinking of a number between 1 to 50')
print("If your guess is more than 10 away from my number, I'll tell you you're COLD")
print("If your guess is within 10 of my number, I'll tell you you're WARM")
print("If your guess is closer than your most recent guess, I'll say you're getting WARMER")
print("LET'S PLAY!")

guesses = [0]

while True:
    
    guess = int(input('I am thinking of a number from 1 to 50.\n What is your guess?'))
    guesses.append(guess)
    
    if guess not in range(1,51):
        print('Out of bounce! Please try again')
        continue
    
    if guess == num:
        print(f'Congratulations! You guessed in only {len(guesses)} guesses!')
        
        break       
    
    if guesses[-2]:
        if abs(num-guess) < abs(num-guesses[-2]):
            print('Warmer')
        else:
            print('Colder')
    else:
        if abs(num-guess) <=10:
            print('Warm')
        else:
            print('Cold')
    
