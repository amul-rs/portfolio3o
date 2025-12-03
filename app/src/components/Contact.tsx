import { MdArrowOutward } from "react-icons/md";
import "./styles/Contact.css";
import { config } from "../config";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [result, setResult] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setResult("Sending...");
    
    const form = event.currentTarget;
    const formData = new FormData(form);
    
    // Add required Web3Forms fields
    formData.append("access_key", "40f3666d-147b-44f6-9652-382d4abf0cf5");
    formData.append("subject", "New Contact Form Submission from Portfolio");
    formData.append("from_name", formData.get("name") as string || "Portfolio Visitor");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Accept": "application/json",
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        form.reset();
        setResult('');
        setIsSubmitting(false);
        Swal.fire({
          title: "Thank you!",
          text: "Your message has been sent successfully. I'll get back to you soon.",
          icon: "success",
          confirmButtonColor: "#7f40ff"
        });
      } else {
        const errorMessage = data.message || "There was an error submitting the form. Please try again.";
        setResult(errorMessage);
        setIsSubmitting(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorMessage,
          confirmButtonColor: "#7f40ff"
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      const errorMessage = error instanceof Error ? error.message : "There was an error. Please try again later.";
      setResult(errorMessage);
      setIsSubmitting(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Unable to send message. Please check your connection and try again.",
        confirmButtonColor: "#7f40ff"
      });
    }
  };

  useEffect(() => {
    const contactTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top 80%",
        end: "bottom center",
        toggleActions: "play none none none",
      },
    });

    // Animate title from bottom
    contactTimeline.fromTo(
      ".contact-section h3",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }
    );

    // Animate contact boxes with stagger from bottom
    contactTimeline.fromTo(
      ".contact-box",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
      },
      "-=0.4"
    );

    // Clean up
    return () => {
      contactTimeline.kill();
    };
  }, []);

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h2>Contact Me</h2>
        <h3>Get in Touch</h3>
        <p style={{ marginBottom: '3rem', fontSize: '18px', fontWeight: 300 }}>
          Feel free to reach out for project discussions or inquiries. Email me with any questions—I'll be happy to answer.
        </p>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href={`mailto:${config.contact.email}`} data-cursor="disable">
                {config.contact.email}
              </a>
            </p>
            {config.contact.phone && (
              <>
                <h4>Mobile Number</h4>
                <p>
                  <a href={`tel:${config.contact.phone.replace(/\s/g, '')}`} data-cursor="disable">
                    {config.contact.phone}
                  </a>
                </p>
              </>
            )}
            <h4>Social</h4>
            {config.contact.linkedin && (
              <a
                href={config.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="disable"
                className="contact-social"
                style={{ display: 'block', marginBottom: '0.5rem' }}
              >
                LinkedIn <MdArrowOutward />
              </a>
            )}
            {config.contact.whatsapp && (
              <a
                href={`https://wa.me/${config.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="disable"
                className="contact-social"
                style={{ display: 'block', marginBottom: '0.5rem' }}
              >
                WhatsApp <MdArrowOutward />
              </a>
            )}
            {config.contact.instagram && (
              <a
                href={config.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="disable"
                className="contact-social"
                style={{ display: 'block', marginBottom: '0.5rem' }}
              >
                Instagram <MdArrowOutward />
              </a>
            )}
          </div>
          <div className="contact-box">
            <h4>Message me</h4>
            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your Name"
                required
                style={{
                  padding: '0.75rem',
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '4px',
                  color: 'white',
                  fontSize: '16px'
                }}
              />
              <input
                type="number"
                name="number"
                id="number"
                placeholder="Your Number"
                required
                style={{
                  padding: '0.75rem',
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '4px',
                  color: 'white',
                  fontSize: '16px'
                }}
              />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your Email"
                required
                style={{
                  padding: '0.75rem',
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '4px',
                  color: 'white',
                  fontSize: '16px'
                }}
              />
              <textarea
                name="message"
                id="message"
                placeholder="Message..."
                rows={4}
                required
                style={{
                  padding: '0.75rem',
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '4px',
                  color: 'white',
                  fontSize: '16px',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '4px',
                  color: 'white',
                  fontSize: '16px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.6 : 1,
                  transition: 'all 0.3s ease',
                  alignSelf: 'flex-start'
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {result && <p style={{ color: 'white', marginTop: '0.5rem', fontSize: '14px' }}>{result}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
