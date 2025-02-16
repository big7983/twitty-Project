"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";

type posts = {
  id: string;
  user: string;
  datetime: string;
  post: string;
  img:string
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState("");
  const [data, setData] = useState<posts[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  const handlePost = async () => {
    try {
      const newPostData = {
        user: session?.user?.name,
        post: post,
        img: session?.user?.image,
      };

      // ส่งข้อมูลไปยัง API ด้วย POST method
      const response = await axios.post(
        "/api/v1/posts",
        newPostData
      );
      setData((prevPosts) => [response.data, ...prevPosts]);
      setPost(""); // เคลียร์ textarea หลังโพสต์สำเร็จ
    } catch {
      setError("เกิดข้อผิดพลาดในการส่งข้อมูล");
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/v1/posts"); // เรียก API โดยตรง
        setData(response.data);
      } catch {
        setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>กำลังโหลดข้อมูล...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen ">
      <div className="flex flex-col gap-5">
        <div className="p-7 rounded-lg shadow-xl bg-white">
          <h1 className="text-2xl font-bold mb-4">โพสต์ Twitty</h1>
          <textarea
            className="w-full p-2 border rounded"
            placeholder="เขียนโพสต์ของคุณ..."
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
          <button
            className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            onClick={handlePost}
          >
            โพสต์
          </button>
        </div>

        <ul className="mt-4 space-y-4 ">
          {data.map((p, index) => (
            <li key={index} className="p-4 rounded-lg shadow bg-white">
              <div className="flex items-center space-x-3 ">
                <Image
                  src={p.img ?? "/avatar-user.jpg"}
                  alt="User Profile"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold">{p.user}</p>
                  <p className="text-sm text-gray-500">{p.datetime}</p>
                </div>
              </div>
              <p className="mt-5">{p.post}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
