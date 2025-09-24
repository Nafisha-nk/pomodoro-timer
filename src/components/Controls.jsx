export default function Controls({ isRunning, setIsRunning }) {
    return (
        <div>
        {!isRunning && <button onClick={() => setIsRunning(true)}>Start</button>}
        {isRunning && <button onClick={() => setIsRunning(false)}>Stop</button>}
        <button onClick={() => setIsRunning((prev) => !prev)}>Resume</button>
        </div>
    );
}