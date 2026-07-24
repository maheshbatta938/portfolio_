/*==================================================
                 MOBILE NAVIGATION
==================================================*/
const menuBtn = document.getElementById("menu-btn");
const navbar = document.querySelector(".navbar");

if (menuBtn && navbar) {
    menuBtn.addEventListener("click", () => {
        navbar.classList.toggle("active");
        menuBtn.innerHTML = navbar.classList.contains("active")
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    // Close menu when links are clicked
    document.querySelectorAll(".navbar a").forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("active");
            menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });
}

/*==================================================
                 STICKY & ACTIVE NAVIGATION
==================================================*/
const header = document.querySelector(".header");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
    // Sticky Header
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }

    // Active Navigation Highlighting
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 180;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

/*==================================================
                 TYPING EFFECT
==================================================*/
const words = [
    "Software Engineer",
    "Full Stack Developer",
    "Backend Engineer",
    "AI/ML Developer",
    "Problem Solver"
];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;
const typing = document.getElementById("typing");

function typeEffect() {
    if (!typing) return;
    const currentWord = words[wordIndex];

    if (!deleting) {
        typing.textContent = currentWord.substring(0, charIndex++);
    } else {
        typing.textContent = currentWord.substring(0, charIndex--);
    }

    let speed = 100;
    if (!deleting && charIndex === currentWord.length + 1) {
        deleting = true;
        speed = 2000; // Pause at the end of the word
    } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 500; // Pause before starting next word
    }

    setTimeout(typeEffect, speed);
}
typeEffect();

/*==================================================
                 SCROLL TO TOP BUTTON
==================================================*/
const topBtn = document.getElementById("topBtn");
if (topBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            topBtn.classList.add("show");
        } else {
            topBtn.classList.remove("show");
        }
    });

    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/*==================================================
                 STATS COUNTER ANIMATION
==================================================*/
const statNumbers = document.querySelectorAll(".stat-card h2");
const statsSection = document.querySelector(".stats");
let statsAnimated = false;

const animateStats = () => {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute("data-target"));
        let count = 0;
        const duration = 1500; // ms
        const stepTime = 15;
        const stepValue = Math.ceil(target / (duration / stepTime));

        const counter = setInterval(() => {
            count += stepValue;
            if (count >= target) {
                stat.textContent = target.toLocaleString() + "+";
                clearInterval(counter);
            } else {
                stat.textContent = count.toLocaleString() + "+";
            }
        }, stepTime);
    });
};

if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                animateStats();
            }
        });
    }, { threshold: 0.5 });
    observer.observe(statsSection);
}

/*==================================================
             HTML5 CANVAS PARTICLES
==================================================*/
const canvas = document.getElementById("particleCanvas");
if (canvas) {
    const ctx = canvas.getContext("2d");
    let particlesArray = [];
    const colors = ["#8b5cf6", "#10b981"]; // Violet, Emerald Green

    // Set canvas dimensions
    const setCanvasSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", () => {
        setCanvasSize();
        initParticles();
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.alpha = Math.random() * 0.4 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
            if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            if (window.innerWidth > 768) {
                ctx.shadowBlur = 8;
                ctx.shadowColor = this.color;
            } else {
                ctx.shadowBlur = 0;
            }
            ctx.fill();
            ctx.restore();
        }
    }

    const initParticles = () => {
        particlesArray = [];
        const quantity = Math.floor((canvas.width * canvas.height) / 18000);
        const maxLimit = Math.min(quantity, 80); // Cap on particles to keep performance fast
        for (let i = 0; i < maxLimit; i++) {
            particlesArray.push(new Particle());
        }
    };
    initParticles();

    const drawLines = () => {
        for (let i = 0; i < particlesArray.length; i++) {
            for (let j = i + 1; j < particlesArray.length; j++) {
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.save();
                    ctx.globalAlpha = (1 - distance / 120) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.strokeStyle = particlesArray[i].color;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }
    };

    const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(particle => {
            particle.update();
            particle.draw();
        });
        drawLines();
        requestAnimationFrame(animateParticles);
    };
    animateParticles();
}

/*==================================================
             DYNAMIC FILTERING LOGIC
==================================================*/
// Skills Filtering
const skillFilterButtons = document.querySelectorAll(".filter-btn");
const skillCards = document.querySelectorAll(".skill-card");

function applySkillsFilter(filterValue, animate = true) {
    skillCards.forEach(card => {
        const category = card.getAttribute("data-category");
        const matches = (filterValue === "all" || category === filterValue);

        if (!animate) {
            if (matches) {
                card.style.display = "flex";
                card.style.opacity = "1";
                card.style.transform = "scale(1) translateY(0)";
            } else {
                card.style.display = "none";
                card.style.opacity = "0";
                card.style.transform = "scale(0.9) translateY(10px)";
            }
        } else {
            // Animate transition
            card.style.opacity = "0";
            card.style.transform = "scale(0.9) translateY(10px)";

            setTimeout(() => {
                if (matches) {
                    card.style.display = "flex";
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "scale(1) translateY(0)";
                    }, 50);
                } else {
                    card.style.display = "none";
                }
            }, 250);
        }
    });
}

// Attach event listeners
skillFilterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        skillFilterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const filterValue = btn.getAttribute("data-filter");
        applySkillsFilter(filterValue, true);
    });
});

// Initially show only the languages
applySkillsFilter("languages", false);

// Projects Filtering
const projectFilterButtons = document.querySelectorAll(".proj-filter-btn");
const projectCards = document.querySelectorAll(".project-card");

projectFilterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        projectFilterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filterValue = btn.getAttribute("data-filter");

        projectCards.forEach(card => {
            card.style.opacity = "0";
            card.style.transform = "scale(0.9) translateY(15px)";

            setTimeout(() => {
                const category = card.getAttribute("data-category") || "";
                const categories = category.split(" ");
                if (filterValue === "all" || categories.includes(filterValue)) {
                    card.style.display = "flex";
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "scale(1) translateY(0)";
                    }, 50);
                } else {
                    card.style.display = "none";
                }
            }, 250);
        });
    });
});

/*==================================================
             AI CHAT ASSISTANT (CHAT HISTORY)
==================================================*/
const chatIcon = document.getElementById("chatIcon");
const chatWindow = document.getElementById("chatWindow");
const closeChat = document.getElementById("closeChat");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const messagesContainer = document.getElementById("messages");
const suggestChips = document.querySelectorAll(".suggest-chip");

// Maintain chat history locally
let chatHistory = [];

// Helper to attach a copy-to-clipboard button to a bot message
function attachCopyButton(botDiv) {
    if (botDiv.querySelector(".copy-msg-btn")) return;
    const copyBtn = document.createElement("button");
    copyBtn.className = "copy-msg-btn";
    copyBtn.title = "Copy message";
    copyBtn.setAttribute("aria-label", "Copy message");
    copyBtn.innerHTML = `<i class="fa-regular fa-copy"></i>`;
    copyBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        // Clone message, remove copy button text so it's not copied
        const clone = botDiv.cloneNode(true);
        const btn = clone.querySelector(".copy-msg-btn");
        if (btn) btn.remove();
        const textToCopy = clone.innerText || clone.textContent;
        navigator.clipboard.writeText(textToCopy.trim()).then(() => {
            copyBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
            copyBtn.classList.add("copied");
            showToast("Copied to clipboard! 📋");
            setTimeout(() => {
                copyBtn.innerHTML = `<i class="fa-regular fa-copy"></i>`;
                copyBtn.classList.remove("copied");
            }, 2000);
        }).catch(err => {
            console.error("Copy error:", err);
        });
    });
    botDiv.appendChild(copyBtn);
}

// Attach copy buttons to welcome message on load
document.querySelectorAll("#messages .bot-message").forEach(attachCopyButton);

// Save chat history to localStorage
function saveChatHistory() {
    localStorage.setItem("mahesh_portfolio_chat_history", JSON.stringify(chatHistory));
}

// Helper to format links in bot messages to open in a new tab safely
function formatBotLinks(container) {
    if (!container) return;
    container.querySelectorAll("a").forEach(link => {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
    });
}

let isHistoryLoaded = false;

// Load chat history from localStorage
function loadChatHistory() {
    if (isHistoryLoaded) return;
    const saved = localStorage.getItem("mahesh_portfolio_chat_history");
    if (!saved) return;
    try {
        const parsed = JSON.parse(saved);
        if (!Array.isArray(parsed) || parsed.length === 0) return;
        chatHistory = parsed;

        if (!messagesContainer) return;

        const welcomeMsg = messagesContainer.querySelector(".bot-message");
        messagesContainer.innerHTML = "";
        if (welcomeMsg) {
            messagesContainer.appendChild(welcomeMsg);
            attachCopyButton(welcomeMsg);
            formatBotLinks(welcomeMsg);
        }

        chatHistory.forEach(item => {
            if (!item || !item.text) return;
            const div = document.createElement("div");
            div.className = item.sender === "user" ? "user-message animate-message" : "bot-message animate-message";
            if (item.sender === "bot") {
                try {
                    if (window.marked && typeof window.marked.parse === "function") {
                        div.innerHTML = window.marked.parse(item.text);
                    } else {
                        div.textContent = item.text;
                    }
                } catch (e) {
                    div.textContent = item.text;
                }
                attachCopyButton(div);
                formatBotLinks(div);
            } else {
                div.textContent = item.text;
            }
            messagesContainer.appendChild(div);
        });

        isHistoryLoaded = true;
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    } catch (e) {
        console.error("Error loading chat history:", e);
    }
}

// Global functions for opening and closing the chat drawer
window.openChatDrawer = function () {
    const chatWindowEl = document.getElementById("chatWindow");
    const chatIconEl = document.getElementById("chatIcon");
    if (chatWindowEl) {
        chatWindowEl.classList.add("active");
    }
    if (chatIconEl) {
        chatIconEl.style.opacity = "0";
        chatIconEl.style.pointerEvents = "none";
    }
    try {
        loadChatHistory();
    } catch (err) {
        console.error("Error opening chat history:", err);
    }
};

window.closeChatDrawer = function () {
    const chatWindowEl = document.getElementById("chatWindow");
    const chatIconEl = document.getElementById("chatIcon");
    if (chatWindowEl) {
        chatWindowEl.classList.remove("active");
    }
    if (chatIconEl) {
        chatIconEl.style.opacity = "1";
        chatIconEl.style.pointerEvents = "auto";
    }
};

if (chatIcon) {
    chatIcon.addEventListener("click", window.openChatDrawer);
}
if (closeChat) {
    closeChat.addEventListener("click", window.closeChatDrawer);
}

// Function to handle sending API requests
async function askPortfolioAI(message) {
    try {
        // Point to the correct local port (3005) configured in backend/.env
        const response = await fetch("https://portfolio-3c3r.onrender.com/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message,
                history: chatHistory
            })
        });

        const data = await response.json();
        if (data.success) {
            return {
                reply: data.reply,
                intent: data.intent || "general",
                isFallback: !!data.isFallback
            };
        } else {
            return {
                reply: "⚠️ Sorry, there was an issue processing that response.",
                intent: "general",
                isFallback: false
            };
        }
    } catch (error) {
        console.error("Fetch Error:", error);
        return {
            reply: "⚠️ I couldn't reach Mahesh's AI server. Please make sure the backend is running.",
            intent: "general",
            isFallback: false
        };
    }
}

// Interactive intent action handlers (scrolling & pulsing sections)
function handleIntentAction(intent) {
    // Only perform background section scrolling if the chat drawer is not active to prevent disorienting jumps
    const isChatActive = chatWindow && chatWindow.classList.contains("active");

    if (intent === "contact") {
        const emailCard = document.getElementById("emailCard");
        if (emailCard) {
            emailCard.classList.add("highlight-pulse-active");
            if (!isChatActive) {
                const contactSection = document.getElementById("contact");
                if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
                showToast("Scrolling to contact details! 📬");
            }
            setTimeout(() => {
                emailCard.classList.remove("highlight-pulse-active");
            }, 4000);
        }
    } else if (intent === "projects") {
        const projectsSection = document.getElementById("projects");
        if (projectsSection) {
            if (!isChatActive) {
                projectsSection.scrollIntoView({ behavior: "smooth" });
                showToast("Showing featured projects! 💻");
            }
            projectsSection.classList.add("highlight-pulse-active");
            setTimeout(() => {
                projectsSection.classList.remove("highlight-pulse-active");
            }, 3000);
        }
    } else if (intent === "resume") {
        const resumeBtn = document.querySelector(".hero-buttons .primary-btn");
        if (resumeBtn) {
            if (!isChatActive) {
                resumeBtn.scrollIntoView({ behavior: "smooth" });
                showToast("Highlighted resume download button! 📄");
            }
            resumeBtn.classList.add("highlight-pulse-active");
            setTimeout(() => {
                resumeBtn.classList.remove("highlight-pulse-active");
            }, 4000);
        }
    } else if (intent === "education") {
        const educationSection = document.getElementById("education");
        if (educationSection) {
            if (!isChatActive) {
                educationSection.scrollIntoView({ behavior: "smooth" });
                showToast("Showing academic journey! 🎓");
            }
            educationSection.classList.add("highlight-pulse-active");
            setTimeout(() => {
                educationSection.classList.remove("highlight-pulse-active");
            }, 3000);
        }
    } else if (intent === "experience") {
        const experienceSection = document.getElementById("experience");
        if (experienceSection) {
            if (!isChatActive) {
                experienceSection.scrollIntoView({ behavior: "smooth" });
                showToast("Showing professional journey! 💼");
            }
            experienceSection.classList.add("highlight-pulse-active");
            setTimeout(() => {
                experienceSection.classList.remove("highlight-pulse-active");
            }, 3000);
        }
    }
}

// Send Message Flow
async function sendMessage() {
    const text = chatInput.value.trim();
    if (text === "") return;

    // Render User Message
    const userDiv = document.createElement("div");
    userDiv.className = "user-message animate-message";
    userDiv.textContent = text;
    messagesContainer.appendChild(userDiv);

    // Clear input, reset height & Scroll
    chatInput.value = "";
    chatInput.style.height = "auto";
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Save user message to local history
    chatHistory.push({ sender: "user", text: text });
    saveChatHistory();

    // Render Typing Indicator
    const typingDiv = document.createElement("div");
    typingDiv.className = "bot-message typing animate-message";
    typingDiv.innerHTML = `<div class="typing-indicator-container"><span>Mahesh AI is typing</span><div class="typing-dots"><span class="dot-loading"></span><span class="dot-loading"></span><span class="dot-loading"></span></div></div>`;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Request AI response
    const result = await askPortfolioAI(text);
    const replyText = result.reply;
    const intent = result.intent;
    typingDiv.remove();

    // Render Bot Message
    const botDiv = document.createElement("div");
    botDiv.className = "bot-message animate-message";

    // Parse Markdown reply using marked
    if (window.marked) {
        botDiv.innerHTML = marked.parse(replyText);
    } else {
        botDiv.textContent = replyText;
    }
    attachCopyButton(botDiv);
    formatBotLinks(botDiv);

    messagesContainer.appendChild(botDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Save model response to local history
    chatHistory.push({ sender: "bot", text: replyText });
    saveChatHistory();

    // Trigger UI effects based on detected intent
    handleIntentAction(intent);
}

if (sendBtn && chatInput) {
    sendBtn.addEventListener("click", sendMessage);

    // Auto-grow textarea height
    chatInput.addEventListener("input", function () {
        this.style.height = "auto";
        this.style.height = (this.scrollHeight) + "px";
    });

    // Submit on Enter key (exclude Shift+Enter)
    chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
}

// Clear chat history trigger
const clearChatBtn = document.getElementById("clearChat");
if (clearChatBtn) {
    clearChatBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to clear your chat history?")) {
            chatHistory = [];
            localStorage.removeItem("mahesh_portfolio_chat_history");
            const welcomeMsg = messagesContainer.firstElementChild;
            messagesContainer.innerHTML = "";
            if (welcomeMsg) {
                messagesContainer.appendChild(welcomeMsg);
                attachCopyButton(welcomeMsg);
            }
            showToast("Chat history cleared! 🧹");
        }
    });
}

// Quick Suggestion Chips setup
suggestChips.forEach(chip => {
    chip.addEventListener("click", () => {
        chatInput.value = chip.textContent.trim();
        sendMessage();
    });
});

// Scroll to bottom floating button handler
const scrollDownBtn = document.getElementById("chatScrollDown");
if (messagesContainer && scrollDownBtn) {
    messagesContainer.addEventListener("scroll", () => {
        const diff = messagesContainer.scrollHeight - messagesContainer.clientHeight - messagesContainer.scrollTop;
        if (diff > 150) {
            scrollDownBtn.classList.add("visible");
        } else {
            scrollDownBtn.classList.remove("visible");
        }
    });

    scrollDownBtn.addEventListener("click", () => {
        messagesContainer.scrollTo({
            top: messagesContainer.scrollHeight,
            behavior: "smooth"
        });
    });
}

/*==================================================
             CONTACT FORM
==================================================*/
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const sendBtnEl = contactForm.querySelector(".btn-send");
        const btnText = sendBtnEl.querySelector("span");
        const btnIcon = sendBtnEl.querySelector("i");

        // Get form values
        const name = document.getElementById("formName").value;
        const email = document.getElementById("formEmail").value;
        const subject = document.getElementById("formSubject").value;
        const message = document.getElementById("formMessage").value;

        // Validate spacing / empty entries
        if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
            showToast("⚠️ Please fill out all fields with valid text.");
            return;
        }

        // Visual sending state
        btnText.textContent = "Sending...";
        btnIcon.className = "fa-solid fa-spinner fa-spin";
        sendBtnEl.style.opacity = "0.75";
        sendBtnEl.style.pointerEvents = "none";

        try {
            /* Updated to use Formspree.io for email delivery */
            const response = await fetch("https://formspree.io/f/mrenengw", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    subject: subject,
                    message: message
                })
            });

            if (response.ok) {
                showToast("Message Sent Successfully! 🚀");
                contactForm.reset();
            } else {
                showToast("⚠️ Failed to send message. Please try again.");
            }
        } catch (error) {
            console.error("Email sending error:", error);
            showToast("⚠️ Network error. Please try again later.");
        } finally {
            // Revert sending state
            btnText.textContent = "Send Message";
            btnIcon.className = "fa-solid fa-paper-plane";
            sendBtnEl.style.opacity = "1";
            sendBtnEl.style.pointerEvents = "auto";
        }
    });
}

/*==================================================
             COPY EMAIL TRIGGER
==================================================*/
const emailCard = document.getElementById("emailCard");
if (emailCard) {
    emailCard.addEventListener("click", () => {
        navigator.clipboard.writeText("maheshbatta539@gmail.com").then(() => {
            showToast("Email copied to clipboard! 📋");
        }).catch(err => {
            console.error("Copy failed:", err);
        });
    });
}

/*==================================================
             TOAST NOTIFICATION SYSTEM
==================================================*/
function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "custom-toast";
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;

    document.body.appendChild(toast);

    // Trigger CSS slide-in
    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    // Auto removal
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, 3000);
}

/*==================================================
             INTERACTIVE SKILL CARD GRADIENTS
==================================================*/
skillCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    });
});

/*==================================================
             TRY CHATBOT PROJECT LINK TRIGGER
==================================================*/
const chatProjectBtn = document.getElementById("openChatProjectBtn");
if (chatProjectBtn) {
    chatProjectBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.openChatDrawer();
    });
}

console.log("Mahesh Batta Portfolio JS Loaded successfully");
