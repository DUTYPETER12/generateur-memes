import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Liste d'exemple d'indicatifs pays (à compléter selon besoin)
const countryCodes = [
  { code: "+33", label: "France (+33)" },
  { code: "+225", label: "Côte d'Ivoire (+225)" },
  { code: "+1", label: "États-Unis (+1)" },
  { code: "+44", label: "Royaume-Uni (+44)" },
  { code: "+49", label: "Allemagne (+49)" },
  { code: "+237", label: "Cameroun (+237)" },
  // Ajoute d'autres pays ici...
];

export default function Register() {
  const { register } = useAuth();
  const [form, setForm] = useState({
    username: "",
    password: "",
    nom: "",
    prenom: "",
    email: "",
    countryCode: "+33",
    phone: "",
    birthdate: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // On concatène l'indicatif pays et le numéro
    const dataToSend = { ...form, phone: form.countryCode + form.phone };
    const ok = await register(dataToSend);
    if (ok) navigate("/login");
    else setError("Erreur lors de l'inscription.");
  };

  return (
    <main>
      <h1>Créer un compte</h1>
      <form onSubmit={handleSubmit}>
        <input name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} />
        <input name="prenom" placeholder="Prénom" value={form.prenom} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <div style={{ display: "flex", gap: 8 }}>
          <select
            name="countryCode"
            value={form.countryCode}
            onChange={handleChange}
            style={{ maxWidth: 140 }}
          >
            {countryCodes.map(c => (
              <option key={c.code} value={c.code}>{c.label}</option>
            ))}
          </select>
          <input
            name="phone"
            type="tel"
            placeholder="Numéro de téléphone"
            value={form.phone}
            onChange={handleChange}
            style={{ flex: 1 }}
          />
        </div>
        <input name="birthdate" type="date" placeholder="Date de naissance" value={form.birthdate} onChange={handleChange} />
        <input name="username" placeholder="Nom d'utilisateur" value={form.username} onChange={handleChange} />
        <input name="password" type="password" placeholder="Mot de passe" value={form.password} onChange={handleChange} />
        <button type="submit">S'inscrire</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>Déjà un compte ? <a href="/login">Se connecter</a></p>
    </main>
  );
}