import { clientsList } from "../list/route"

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
        return Response.json({
            error: "ID is required"
        }, { status: 400 })
    }

    await new Promise(resolve => setTimeout(resolve, 1000))
    const seachedClient = clientsList.find(client => client.id === id)

    if (!seachedClient) {
        return Response.json({
            error: "Client not found"
        }, { status: 404 })
    }

    const info: { id: string, name: string, folder: Folder | null } = {
        id: seachedClient.id,
        name: seachedClient.name,
        folder: seachedClient.folder || null
    }

    return Response.json({
        info: info
    })
}