export default function getGreeting() {
  const greetings: string[] = [
    "Welcome back,",
    "Ahoy,",
    "Hello,",
    "Hi,",
    "Hey there,",
    "Howdy,",
    "Welcome",
    "Rise and grind,",
  ];

  const answer = greetings[Math.floor(Math.random() * greetings.length)];
  return answer;
}
