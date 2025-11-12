export async function GET() {

    await new Promise(resolve => setTimeout(resolve, 1000))

    const list: SidebarList = [
        {
            id: "folder-1",
            name: "Tech Startups",
            type: "folder",
            clientItems: [
                {
                    id: "client-1",
                    name: "CloudSync Solutions",
                    type: "client"
                },
                {
                    id: "client-2",
                    name: "DataFlow Analytics",
                    type: "client"
                },
                {
                    id: "client-3",
                    name: "AI Innovations Lab",
                    type: "client"
                }
            ]
        },
        {
            id: "folder-2",
            name: "E-commerce",
            type: "folder",
            clientItems: [
                {
                    id: "client-4",
                    name: "Fashion Hub Online",
                    type: "client"
                },
                {
                    id: "client-5",
                    name: "Home Decor Marketplace",
                    type: "client"
                },
                {
                    id: "client-6",
                    name: "Sports Gear Direct",
                    type: "client"
                }
            ]
        },
        {
            id: "folder-3",
            name: "Healthcare",
            type: "folder",
            clientItems: [
                {
                    id: "client-7",
                    name: "MediCare Plus",
                    type: "client"
                },
                {
                    id: "client-8",
                    name: "Wellness Center Network",
                    type: "client"
                }
            ]
        },
        {
            id: "client-9",
            name: "Acme Corporation",
            type: "client"
        },
        {
            id: "client-10",
            name: "Green Energy Solutions",
            type: "client"
        },
        {
            id: "client-11",
            name: "Urban Real Estate Group",
            type: "client"
        },
        {
            id: "client-12",
            name: "Pacific Consulting Partners",
            type: "client"
        }
    ]

    return Response.json({
        list: list
    })
}