graph TD
    %% Define Styles to match Klass Hero Palette
    classDef public fill:#FFEAC9,stroke:#333,stroke-width:2px,color:#000;
    classDef parent fill:#0FC3FF,stroke:#333,stroke-width:2px,color:#000;
    classDef provider fill:#FFFF36,stroke:#333,stroke-width:2px,color:#000;
    classDef logic fill:#f9f9f9,stroke:#666,stroke-dasharray: 5 5,color:#333;
    classDef bridge fill:#fff,stroke:#000,stroke-width:3px;

    %% --- PUBLIC GUEST FLOW ---
    subgraph Public_Experience [1. Guest / Public Flow]
        L(Landing Page) --> PP(Public Program Explorer)
        L --> AB(About & Vetting Process)
        PP --> PDet(Program Details)
        PDet -- "Action: Click Book" --> Auth{Login / Sign Up}
        
        Logic1[<b>Logic: Discovery</b><br/>Guests can view programs<br/>but map & booking<br/>features are locked.]
        Logic1 -.- L
    end

    %% --- THE AUTH GATEWAY ---
    Auth -- "Role: Parent" --> P_Home
    Auth -- "Role: Provider" --> V_Home

    %% --- PARENT WORKFLOW ---
    subgraph Parent_Portal [2. Parent Journey: Management & Booking]
        P_Home(Parent Dashboard) --> P_Exp(Explore & Search)
        P_Home --> P_Plan(Weekly Activity Planner)
        P_Home --> P_Comm(Community & Job Board)
        P_Exp --> P_Book[Book Activity]
        
        Logic2[<b>Logic: Family Success</b><br/>Focus on child safety,<br/>calendar synchronization,<br/>and point rewards.]
        Logic2 -.- P_Home
    end

    %% --- PROVIDER WORKFLOW ---
    subgraph Provider_Portal [3. Provider Journey: Scale & Business]
        V_Home(Business Overview) --> V_Team(Team & Staff Profiles)
        V_Home --> V_Prog(Program Inventory)
        V_Home --> V_Fin(Finance: Invoices & Expenses)
        V_Prog --> V_List[List New Service]
        V_Fin --> V_Pay[Calculate Staff Payouts]
        
        Logic3[<b>Logic: Business Growth</b><br/>Focus on inventory control,<br/>financial transparency,<br/>and staff assignments.]
        Logic3 -.- V_Home
    end

    %% --- THE MARKETPLACE BRIDGES (WHERE THEY MEET) ---
    subgraph Marketplace_Bridge [4. Interaction Bridge]
        P_Chat(Parent Chat) <== "Messaging & Video Calls" ==> V_Chat(Provider Chat)
        P_Comm -- "Posts Job Need" --> V_Jobs(Job Discovery)
        V_Jobs -- "Applies to Job" --> P_Chat
        
        Logic4[<b>Logic: Trust Building</b><br/>Direct bridge for vetted<br/>interviews and real-time<br/>updates.]
        Logic4 -.- Marketplace_Bridge
    end

    %% Assigning Classes for Visual Representation
    class L,PP,AB,PDet public;
    class P_Home,P_Exp,P_Plan,P_Comm,P_Book parent;
    class V_Home,V_Team,V_Prog,V_Fin,V_List,V_Pay,V_Jobs provider;
    class Logic1,Logic2,Logic3,Logic4 logic;
    class Auth bridge;