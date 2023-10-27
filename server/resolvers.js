const find = require("lodash.find")

const resolvers = {
    Query: {
        people: () => person,
        cars: () => cars,
        person: (root, args) => {
            return find(person, { id: args.id })
        },
        personWithCars: (root, args) => {
            const p = find(person, { id: args.id })
            if (p) {
                const personsCars = cars.filter((car) => car.personId === args.id)
                console.log(p);
                return {
                    ...p,
                    cars: personsCars
                }
            }
            else {
                throw new Error("Couldn't find the person")
            }
        }
    },
    Mutation: {
        createPerson: (root, args) => {
            const newPerson = {
                id: args.id,
                firstName: args.firstName,
                lastName: args.lastName
            }

            people.push(newPerson)
            return newPerson
        },
        createCar: (root, args) => {
            const newCar = {
                id: args.id,
                year: args.year,
                make: args.make,
                model: args.model,
                price: args.price,
                personId: args.personId

            }
            cars.push(newCar)
            return newCar

        },

        updatePerson: (root, args) => {
            const person = find(people, { id: args.id })
            if (!person) {
                throw new Error("Couldn't find person with that id")
            }
            person.firstName = args.firstName
            person.lastName = args.lastName
            return person
        },

        updateCar: (root, args) => {
            const car = find(cars, { id: args.id })
            if (!car) {
                throw new Error("No car found")
            }
            car.year = args.year;
            car.make = args.make;
            car.model = args.model;
            car.price = args.price;
            car.personId = args.personId;
            return car
        },

        deletePerson: (root, args) => {
            const removedPerson = find(people, { id: args.id })

            if (!removedPerson) {
                throw new Error(`Couldn't find person with id ${args.id}`)
            }

            const removedCars = cars.filter((car) => car.personId === args.id)


            remove(people, p => {
                return p.id === removedPerson.id
            })

            for (const car of removedCars) {
                remove(cars, c => {
                    return c.id === car.id
                })
            }


            return removedPerson
        },

        deleteCar: (root, args) => {
            const removedCar = find(cars, { id: args.id })

            if (!removedCar) {
                throw new Error(`Couldn't find car with id ${args.id}`)
            }

            remove(cars, c => {
                return c.id === removedCar.id
            })

            return removedCar
        },

    }
};

module.exports = resolvers;
