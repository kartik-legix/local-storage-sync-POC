export const clientsList: ClientsList = [
    // Tech Startups folder clients
    {
        id: "client-1",
        name: "CloudSync Solutions",
        folder: {
            id: "folder-1",
            name: "Tech Startups"
        }
    },
    {
        id: "client-2",
        name: "DataFlow Analytics",
        folder: {
            id: "folder-1",
            name: "Tech Startups"
        }
    },
    {
        id: "client-3",
        name: "AI Innovations Lab",
        folder: {
            id: "folder-1",
            name: "Tech Startups"
        }
    },
    // E-commerce folder clients
    {
        id: "client-4",
        name: "Fashion Hub Online",
        folder: {
            id: "folder-2",
            name: "E-commerce"
        }
    },
    {
        id: "client-5",
        name: "Home Decor Marketplace",
        folder: {
            id: "folder-2",
            name: "E-commerce"
        }
    },
    {
        id: "client-6",
        name: "Sports Gear Direct",
        folder: {
            id: "folder-2",
            name: "E-commerce"
        }
    },
    // Healthcare folder clients
    {
        id: "client-7",
        name: "MediCare Plus",
        folder: {
            id: "folder-3",
            name: "Healthcare"
        }
    },
    {
        id: "client-8",
        name: "Wellness Center Network",
        folder: {
            id: "folder-3",
            name: "Healthcare"
        }
    },
    // Standalone clients (no folder)
    {
        id: "client-9",
        name: "Acme Corporation",
        folder: null
    },
    {
        id: "client-10",
        name: "Green Energy Solutions",
        folder: null
    },
    {
        id: "client-11",
        name: "Urban Real Estate Group",
        folder: null
    },
    {
        id: "client-12",
        name: "Pacific Consulting Partners",
        folder: null
    }
]

export async function GET() {

    await new Promise(resolve => setTimeout(resolve, 500))

    const list: ClientsList = clientsList

    return Response.json({
        list: list
    })
}