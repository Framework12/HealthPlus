import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const doctorDetails = {
  email: "doctor@healthplus.com",
  password: "health123",
  name: "Dr. Azmat",
  avatar: "/src/assets/doctor-portrait.jpg"
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (email === doctorDetails.email && password === doctorDetails.password) {
      localStorage.setItem("doctor", JSON.stringify(doctorDetails));
      navigate("/");
    } else {
      setError("Invalid credentials");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100">
      <form onSubmit={handleLogin} className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-sm flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center mb-2">Doctor Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        <button type="submit" className="bg-primary text-white rounded-lg py-2 font-semibold hover:bg-primary/90 transition">Login</button>
        <div className="text-center mt-2">
          <span className="text-sm text-muted-foreground">Don't have an account? </span>
          <Link to="/register" className="text-primary font-semibold hover:underline">Sign up</Link>
        </div>
      </form>
    </div>
  );
}
