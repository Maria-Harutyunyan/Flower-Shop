import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 60px 40px;
  background: ${({ theme }) => theme.background};
  min-height: 100vh;
`;

const FormWrapper = styled.div`
  max-width: 600px;
  margin: auto;
  background: ${({ theme }) => theme.card};
  padding: 30px;
  border-radius: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border-radius: 10px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  height: 120px;
  border-radius: 10px;
  border: 1px solid #ccc;
  margin-bottom: 15px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    opacity: 0.85;
  }
`;

const Message = styled.p`
  text-align: center;
  margin-top: 15px;
  color: green;
`;

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields");
      return;
    }

    // Simulate sending (later we connect backend)
    console.log("Form submitted:", form);

    // Reset form
    setForm({ name: "", email: "", message: "" });

    // Show success message
    setSuccess("Message sent successfully! 🌸");

    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Contact Us 🌸</Title>
        <br />
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
          />

          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
          />

          <TextArea
            name="message"
            placeholder="Your Message..."
            value={form.message}
            onChange={handleChange}
          />

          <Button type="submit">Send Message</Button>
        </form>

        {success && <Message>{success}</Message>}
      </FormWrapper>
    </Container>
  );
}

export default Contact;
