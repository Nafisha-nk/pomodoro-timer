export default function Settings({ settings, setSettings }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings((prev) => ({
        ...prev,
        [name]: Number(value) * 60,
        }));
    };

    return (
        <div className="settings-container">
            <div className="input-group">
                <label>Work (min):</label>
                <input name="work" type="number" value={settings.work / 60} onChange={handleChange} />
            </div>
            <div className="input-group">
                <label>Short Break (min):</label>
                <input name="shortBreak" type="number" value={settings.shortBreak / 60} onChange={handleChange} />
            </div>
            <div className="input-group">
                <label>Long Break (min):</label>
                <input name="longBreak" type="number" value={settings.longBreak / 60} onChange={handleChange} />
            </div>
        </div>
    );
}