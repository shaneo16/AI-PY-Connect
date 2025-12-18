<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/194qGal1Ey9w83bxecygwXrZeri4wZ8IS

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

graph TD
    %% Global Styles
    classDef guest fill:#FFEAC9,stroke:#333,stroke-width:2px;
    classDef parent fill:#0FC3FF,stroke:#333,stroke-width:2px,color:#000;
    classDef provider fill:#FFFF36,stroke:#333,stroke-width:2px,color:#000;
    classDef action fill:#fff,stroke-dasharray: 5 5;

    subgraph Guest_Flow [Public / Guest Experience]
        L(Landing Page) --> A(About Page)
        L --> PP(Public Programs List)
        L --> PR(Parents Resources - Blog)
        L --> VR(Provider Resources - Blog)
        PP --> PPD(Public Program Detail)
        PPD -- "CTA: Register to Book" --> Login
    end

    L --> Login{Login / Sign Up}

    subgraph Parent_Portal [Authenticated Parent Flow]
        Login -- "Role: Parent" --> PDash(Parent Dashboard)
        PDash --> P_Exp(Explore Programs)
        PDash --> P_Plan(Planner / Calendar)
        PDash --> P_Comm(Community Feed & Jobs)
        PDash --> P_Chat(Chat & Video Calls)
        PDash --> P_Set(Account Settings)
        P_Exp --> P_Book[Book Activity]
    end

    subgraph Provider_Portal [Authenticated Provider Flow]
        Login -- "Role: Provider" --> VDash(Provider Overview)
        VDash --> V_Team(Team & Staff Profiles)
        VDash --> V_Prog(Program Inventory)
        VDash --> V_Fin(Finance: Expenses & Invoices)
        VDash --> V_Chat(Messages & Broadcasts)
        VDash --> V_Anly(Analytics & Growth)
        V_Prog --> V_Manage[Manage Rosters]
    end

    %% Cross-Role Interaction
    P_Chat <--> V_Chat
    P_Comm -- "Post Job" --> V_Chat

    %% Assigning Classes
    class L,A,PP,PR,VR,PPD guest;
    class PDash,P_Exp,P_Plan,P_Comm,P_Chat,P_Set,P_Book parent;
    class VDash,V_Team,V_Prog,V_Fin,V_Chat,V_Anly,V_Manage provider;
    class Login action;
