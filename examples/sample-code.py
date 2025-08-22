# Sample Python code for testing class diagram generation
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        pass

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)
        self.breed = breed
    
    def speak(self):
        return "Woof!"
    
    def fetch(self, item):
        return f"{self.name} fetches the {item}"

class Cat(Animal):
    def __init__(self, name, color):
        super().__init__(name)
        self.color = color
    
    def speak(self):
        return "Meow!"
    
    def purr(self):
        return "Purrr..."

class Owner:
    def __init__(self, name):
        self.name = name
        self.pets = []
    
    def add_pet(self, pet):
        self.pets.append(pet)
    
    def list_pets(self):
        return [pet.name for pet in self.pets]

# Example usage
if __name__ == "__main__":
    dog = Dog("Buddy", "Golden Retriever")
    cat = Cat("Whiskers", "Orange")
    owner = Owner("John")
    
    owner.add_pet(dog)
    owner.add_pet(cat)
    
    print(f"{owner.name}'s pets: {owner.list_pets()}")
    print(f"{dog.name} says: {dog.speak()}")
    print(f"{cat.name} says: {cat.speak()}")
