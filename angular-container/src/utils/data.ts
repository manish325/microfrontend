import { IUser } from "./types";

export const users: IUser[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "dummy@gmail.com",
    password: "dummy",
    address: "123 Maple Street, Springfield, IL",
    tasks: [
      { id : 1, name: "Buy groceries", description: "Get milk, eggs, and bread", completed : false },
      { id : 2, name: "Clean the house", description: "Dust all rooms and vacuum", completed : false }
    ]
  },
  // {
  //   id: "2",
  //   name: "Bob Smith",
  //   email: "bob.smith@example.com",
  //   password: "securepass456",
  //   address: "456 Oak Avenue, Metropolis, NY",
  //   tasks: [
  //     { id : 1, name: "Complete project report", description: "Finish the Q4 analysis" },
  //     { id : 2, name: "Call the plumber", description: "Fix the kitchen sink" }
  //   ]
  // },
  // {
  //   id: "3",
  //   name: "Charlie Brown",
  //   email: "charlie.brown@example.com",
  //   password: "charlie789",
  //   address: "789 Pine Lane, Smalltown, CA",
  //   tasks: [
  //     { id : 1, name: "Walk the dog", description: "Take Snoopy for a walk" },
  //     { id : 2, name: "Practice baseball", description: "Batting practice at 5pm" }
  //   ]
  // },
  // {
  //   id: "4",
  //   name: "Diana Prince",
  //   email: "diana.prince@example.com",
  //   password: "wonderwoman321",
  //   address: "321 Elm Street, Gotham, NJ",
  //   tasks: [
  //     { id : 1, name: "Save the world", description: "Defeat the villain" },
  //     { id : 2,  name: "Meet with Justice League", description: "Plan the next mission" }
  //   ]
  // },
  // {
  //   id: "5",
  //   name: "Ethan Hunt",
  //   email: "ethan.hunt@example.com",
  //   password: "missionimpossible",
  //   address: "654 Birch Road, Cityville, TX",
  //   tasks: [
  //     { id : 1, name: "Plan the mission", description: "Review the intel" },
  //     { id : 2, name: "Execute the heist", description: "Retrieve the secret documents" }
  //   ]
  // },
  // {
  //   id: "6",
  //   name: "Fiona Gallagher",
  //   email: "fiona.gallagher@example.com",
  //   password: "fiona@123",
  //   address: "987 Cedar Drive, Hilltown, WA",
  //   tasks: [
  //     { id: 1, name: "Pay the bills", description: "Settle the rent and utilities" },
  //     { id : 2, name: "Grocery shopping", description: "Get food for the week" }
  //   ]
  // },
  // {
  //   id: "7",
  //   name: "George Costanza",
  //   email: "george.costanza@example.com",
  //   password: "george!@#",
  //   address: "135 Spruce Circle, Newtown, FL",
  //   tasks: [
  //     { id : 1, name: "Attend job interview", description: "Interview at Vandelay Industries" },
  //     { id : 2, name: "Pick up dry cleaning", description: "Get the shirts from the cleaners" }
  //   ]
  // },
  // {
  //   id: "8",
  //   name: "Hannah Montana",
  //   email: "hannah.montana@example.com",
  //   password: "bestofbothworlds",
  //   address: "246 Walnut Street, Beach City, CA",
  //   tasks: [
  //     { id : 1, name: "Perform at the concert", description: "Sing 'Best of Both Worlds'" },
  //     { id :2, name: "Rehearse new song", description: "Practice lyrics for the next album" }
  //   ]
  // },
  // {
  //   id: "9",
  //   name: "Ivy League",
  //   email: "ivy.league@example.com",
  //   password: "ivy2024",
  //   address: "369 Maplewood Avenue, College Town, MA",
  //   tasks: [
  //     { id : 1, name: "Submit final thesis", description: "Complete and submit the thesis paper" },
  //     { id: 2, name: "Prepare for exams", description: "Study for the upcoming finals" }
  //   ]
  // },
  // {
  //   id: "10",
  //   name: "Jack Sparrow",
  //   email: "jack.sparrow@example.com",
  //   password: "pirateking",
  //   address: "951 Treasure Island, Oceanview, FL",
  //   tasks: [
  //     { id : 1, name: "Find the treasure", description: "Search for hidden gold" },
  //     { id : 2, name: "Steer the ship", description: "Navigate to Tortuga" }
  //   ]
  // }
];
