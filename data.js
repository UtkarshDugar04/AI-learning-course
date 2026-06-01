// data.js
const DATA = {
  weeks: [
    {
      id: "week1",
      title: "Week 1: Foundations of AI",
      duration: "8 hours",
      theme: "Understanding how modern AI emerged — and why it took so long",
      modules: ["mod_history", "mod_ml", "mod_deep_learning"]
    },
    {
      id: "week2",
      title: "Week 2: How Modern AI Works",
      duration: "8 hours",
      theme: "Building a precise mental model of LLMs — from tokens to agents",
      modules: ["mod_tokens_embeddings", "mod_attention", "mod_training", "mod_agents"]
    },
    {
      id: "week3",
      title: "Week 3: Building With AI",
      duration: "8 hours",
      theme: "How real AI products are actually designed and built",
      modules: ["mod_apis_rag", "mod_vectors_mcp", "mod_ux_patterns"]
    },
    {
      id: "week4",
      title: "Week 4: Strategy & Future",
      duration: "8 hours",
      theme: "Where the industry is heading and how to think strategically",
      modules: ["mod_business_models", "mod_frontier", "mod_impact"]
    }
  ],

  modules: {
    "mod_history": {
      id: "mod_history",
      title: "The Three Eras of AI",
      week: "week1",
      duration: "2 hours",
      objective: "Trace major milestones of AI from 1950 to today and understand why symbolic AI failed.",
      concepts: ["Symbolic AI", "Machine Learning", "Deep Learning"],
      resources: [
        { type: "video", title: "The History of Artificial Intelligence (Lex Fridman / CS50)", duration: "45m", url: "https://www.youtube.com/results?search_query=history+of+ai" },
        { type: "article", title: "The Bitter Lesson by Richard Sutton", duration: "10m", url: "http://www.incompleteideas.net/IncIdeas/BitterLesson.html" }
      ]
    },
    "mod_ml": {
      id: "mod_ml",
      title: "Machine Learning Fundamentals",
      week: "week1",
      duration: "2 hours",
      objective: "Explain the difference between symbolic AI and machine learning, and understand gradient descent.",
      concepts: ["Gradient Descent", "Decision Trees", "Backpropagation"],
      resources: [
        { type: "video", title: "But what is a neural network? (3Blue1Brown)", duration: "19m", url: "https://www.youtube.com/watch?v=aircAruvnKk" },
        { type: "video", title: "Gradient descent, how neural networks learn (3Blue1Brown)", duration: "21m", url: "https://www.youtube.com/watch?v=IHZwWFHWa-w" },
        { type: "interactive", title: "A Visual Introduction to Machine Learning", duration: "20m", url: "http://www.r2d3.us/visual-intro-to-machine-learning-part1/" }
      ]
    },
    "mod_deep_learning": {
      id: "mod_deep_learning",
      title: "Deep Learning & Transformers",
      week: "week1",
      duration: "4 hours",
      objective: "Understand why the 2012 ImageNet breakthrough and 2017 Transformer paper were inflection points.",
      concepts: ["Neural Networks", "Transformers", "ImageNet"],
      resources: [
        { type: "video", title: "Intro to Large Language Models (Andrej Karpathy)", duration: "60m", url: "https://www.youtube.com/watch?v=zjkBMFhNj_g" },
        { type: "article", title: "The Illustrated Word2Vec", duration: "25m", url: "https://jalammar.github.io/illustrated-word2vec/" }
      ]
    },
    "mod_tokens_embeddings": {
      id: "mod_tokens_embeddings",
      title: "Tokens and Embeddings",
      week: "week2",
      duration: "2 hours",
      objective: "Explain what a token is and describe embeddings using a spatial analogy.",
      concepts: ["Tokens", "Embeddings", "High-dimensional space"],
      resources: [
        { type: "interactive", title: "Tiktokenizer", duration: "20m", url: "https://tiktokenizer.vercel.app/" },
        { type: "interactive", title: "TensorFlow Embedding Projector", duration: "20m", url: "https://projector.tensorflow.org/" },
        { type: "video", title: "Transformers explained visually (3Blue1Brown)", duration: "26m", url: "https://www.youtube.com/watch?v=wjZofJX0v4M" }
      ]
    },
    "mod_attention": {
      id: "mod_attention",
      title: "Attention & Context",
      week: "week2",
      duration: "2 hours",
      objective: "Explain the attention mechanism without math and understand context windows.",
      concepts: ["Attention Mechanism", "Context Window", "Self-attention"],
      resources: [
        { type: "article", title: "The Illustrated Transformer", duration: "40m", url: "https://jalammar.github.io/illustrated-transformer/" },
        { type: "video", title: "Attention in transformers, visually explained (3Blue1Brown)", duration: "26m", url: "https://www.youtube.com/watch?v=eMlx5fFNoYc" }
      ]
    },
    "mod_training": {
      id: "mod_training",
      title: "Training, RLHF, and Reasoning",
      week: "week2",
      duration: "2 hours",
      objective: "Articulate the difference between training and inference, and explain RLHF.",
      concepts: ["Pre-training", "Fine-tuning", "RLHF", "Inference"],
      resources: [
        { type: "video", title: "State of GPT (Andrej Karpathy)", duration: "43m", url: "https://www.youtube.com/watch?v=bZQun8Y4L2A" },
        { type: "article", title: "RLHF: Reinforcement Learning from Human Feedback", duration: "30m", url: "https://lilianweng.github.io/posts/2021-01-31-awac/" }
      ]
    },
    "mod_agents": {
      id: "mod_agents",
      title: "Agents and Multimodal AI",
      week: "week2",
      duration: "2 hours",
      objective: "Explain multimodal AI and understand what an AI agent is.",
      concepts: ["Multimodal", "Agents", "Reasoning Models"],
      resources: [
        { type: "video", title: "Two Minute Papers: Reasoning Models", duration: "20m", url: "https://www.youtube.com/user/keeroyz" },
        { type: "article", title: "Anthropic: Building Effective Agents", duration: "30m", url: "https://www.anthropic.com/research/building-effective-agents" }
      ]
    },
    "mod_apis_rag": {
      id: "mod_apis_rag",
      title: "APIs & RAG",
      week: "week3",
      duration: "4 hours",
      objective: "Explain what an API is and why RAG exists.",
      concepts: ["API", "RAG", "Knowledge Cutoff"],
      resources: [
        { type: "video", title: "CS50: APIs", duration: "30m", url: "https://www.youtube.com/results?search_query=cs50+api" },
        { type: "video", title: "IBM Technology: RAG explained", duration: "8m", url: "https://www.youtube.com/watch?v=T-D1OfcDW1M" }
      ]
    },
    "mod_vectors_mcp": {
      id: "mod_vectors_mcp",
      title: "Vector DBs & Tool Calling",
      week: "week3",
      duration: "2 hours",
      objective: "Explain vector databases, agent architectures, and MCP.",
      concepts: ["Vector Database", "Tool Calling", "MCP"],
      resources: [
        { type: "video", title: "What is a Vector Database? (Fireship)", duration: "10m", url: "https://www.youtube.com/watch?v=klTvEwg3oJ4" },
        { type: "article", title: "Anthropic MCP Documentation", duration: "15m", url: "https://modelcontextprotocol.io" }
      ]
    },
    "mod_ux_patterns": {
      id: "mod_ux_patterns",
      title: "AI-Native UX Patterns",
      week: "week3",
      duration: "2 hours",
      objective: "Identify AI-native UX patterns and apply design thinking.",
      concepts: ["Non-determinism", "Streaming", "Human-in-the-loop"],
      resources: [
        { type: "article", title: "Human-AI Interaction Design Patterns (NN/g)", duration: "25m", url: "https://www.nngroup.com/articles/ai-ux/" }
      ]
    },
    "mod_business_models": {
      id: "mod_business_models",
      title: "Business Models & Strategy",
      week: "week4",
      duration: "3 hours",
      objective: "Describe major AI business model archetypes and what makes an AI company defensible.",
      concepts: ["Infrastructure Layer", "Model Layer", "Vertical AI"],
      resources: [
        { type: "video", title: "Y Combinator: How to Build AI Products", duration: "30m", url: "https://www.youtube.com/results?search_query=y+combinator+how+to+build+ai+products" }
      ]
    },
    "mod_frontier": {
      id: "mod_frontier",
      title: "Frontier Research",
      week: "week4",
      duration: "3 hours",
      objective: "Articulate the state of reasoning, agents, robotics, and AGI.",
      concepts: ["AGI", "World Models", "Embodied AI"],
      resources: [
        { type: "article", title: "State of AI Report", duration: "45m", url: "https://www.stateof.ai/" }
      ]
    },
    "mod_impact": {
      id: "mod_impact",
      title: "Societal Impact",
      week: "week4",
      duration: "2 hours",
      objective: "Discuss AI's impact on work, education, healthcare, and governance.",
      concepts: ["Governance", "Automation", "Augmentation"],
      resources: [
        { type: "article", title: "AI Now Institute Reports", duration: "30m", url: "https://ainowinstitute.org/" }
      ]
    }
  },

  activeRecallBank: [
    { concept: "Embeddings", prompt: "Explain embeddings using a city map analogy." },
    { concept: "RAG vs Fine-tuning", prompt: "Why is RAG different from fine-tuning? When would you use each?" },
    { concept: "Transformers", prompt: "How would you explain transformers to a founder who isn't technical?" },
    { concept: "Gradient Descent", prompt: "Explain gradient descent to someone who has never heard of it, using an everyday analogy." },
    { concept: "Context Window", prompt: "Explain why 'longer context windows' are expensive using the attention mechanism as your starting point." },
    { concept: "Tokens", prompt: "Why does a model trained on English perform differently than one trained on a mix of languages?" },
    { concept: "RLHF", prompt: "Why did RLHF change what LLMs are useful for? What did pre-RLHF models lack?" }
  ],

  projects: [
    {
      id: "proj_1",
      title: "AI Evolution Map",
      week: "week1",
      goal: "Map the history of AI from symbolic AI to transformers.",
      deliverable: "A visual timeline or diagram.",
      resources: "Use the Bitter Lesson and History of AI videos."
    },
    {
      id: "proj_2",
      title: "LLM Visual Explainer",
      week: "week2",
      goal: "Create a visual breakdown of how an LLM processes a prompt.",
      deliverable: "A diagram showing tokenization, embeddings, attention, and inference.",
      resources: "Reference 'The Illustrated Transformer'."
    },
    {
      id: "proj_3",
      title: "AI Product Teardown",
      week: "week3",
      goal: "Deconstruct the UX and architecture of an AI tool (e.g., Cursor, Perplexity).",
      deliverable: "A 2-page teardown document.",
      resources: "Reference NN/g AI UX guidelines."
    },
    {
      id: "proj_4",
      title: "AI Venture Thesis",
      week: "week4",
      goal: "Formulate an investment thesis for a vertical AI company.",
      deliverable: "A 1-page memo outlining the problem, solution, defensibility, and moat.",
      resources: "Reference Y Combinator startup videos."
    }
  ],

  intelligenceHub: {
    researchers: [
      { name: "Andrej Karpathy", level: "Beginner-Intermediate", bestFor: "Deep technical concepts explained simply.", why: "Former Director of AI at Tesla and founding member of OpenAI. Master explainer.", summary: "Follow for educational videos on LLMs and neural networks." },
      { name: "Yann LeCun", level: "Advanced", bestFor: "Understanding the limitations of current LLMs and the case for objective-driven AI.", why: "Chief AI Scientist at Meta, Turing Award winner.", summary: "Follow for skeptical, rigorous perspectives on AGI." },
      { name: "Lilian Weng", level: "Intermediate-Advanced", bestFor: "In-depth technical overviews of emerging AI architectures.", why: "Applied AI Research lead at OpenAI.", summary: "Follow for her exceptionally clear, comprehensive blog posts on agents and RLHF." }
    ],
    founders: [
      { name: "Sam Altman", level: "Beginner", bestFor: "High-level strategic narratives and product announcements.", why: "CEO of OpenAI.", summary: "Follow for macro trends and policy statements." },
      { name: "Dario Amodei", level: "Intermediate", bestFor: "Safety-first approaches and Constitutional AI.", why: "CEO of Anthropic.", summary: "Follow for thoughtful essays on AI safety and scaling laws." },
      { name: "Clem Delangue", level: "Beginner-Intermediate", bestFor: "Open-source AI movement updates.", why: "CEO of Hugging Face.", summary: "Follow for the pulse of the open-source community." }
    ],
    newsletters: [
      { name: "Latent Space", level: "Intermediate", bestFor: "Builder perspectives and technical interviews.", why: "Run by engineers actively building in the space.", summary: "Excellent podcast and newsletter for AI engineers and designers." },
      { name: "Import AI", level: "Intermediate", bestFor: "Summaries of recent papers and policy moves.", why: "Written by Jack Clark, co-founder of Anthropic.", summary: "Weekly roundup of why things matter." },
      { name: "TLDR AI", level: "Beginner", bestFor: "Daily quick summaries of product launches.", why: "High volume, low friction.", summary: "Best for staying aware of daily news." }
    ]
  }
};
