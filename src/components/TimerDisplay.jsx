export default function TimerDisplay({ timeLeft }) {
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const seconds = String(timeLeft % 60).padStart(2, "0");
    return (
        <h1>
        {minutes}:{seconds}
        </h1>
    );
}
