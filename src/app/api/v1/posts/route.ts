import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const Allposts = await prisma.post.findMany(); // Fetch all training forms
    return new Response(JSON.stringify(Allposts), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching Post:", error); // Log the error for debugging
    return new Response("Error fetching Post", {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user, post, img } = body;
    const newPost = await prisma.post.create({
      data: {
        user,
        post,
        img
      },
    });
    return new Response(JSON.stringify(newPost), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating newPost:", error);
    return new Response("Error creating newPost", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
