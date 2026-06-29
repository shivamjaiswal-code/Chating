import { useState } from "react"
import ChatPage from "./ChatPage"

function JoinRoom() {

  const [username, setUsername] = useState("")
  const [roomId, setRoomId] = useState("")
  const [password, setPassword] = useState("")
  const [joined, setJoined] = useState(false)

  const handleJoin = () => {

    if (!username || !roomId || !password) {
      alert("Please fill all fields")
      return
    }

    setJoined(true)

  }

  if (joined) {
    return <ChatPage />
  }

  return (

    <div className="bg-zinc-900 h-screen flex items-center justify-center">

      <div className="bg-zinc-800 p-10 rounded-2xl w-[400px]">

        <h1 className="text-white text-4xl font-bold text-center mb-8">

          Secret Room

        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 rounded-lg mb-4 bg-zinc-700 text-white outline-none"
        />

        <input
          type="text"
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="w-full p-3 rounded-lg mb-4 bg-zinc-700 text-white outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg mb-6 bg-zinc-700 text-white outline-none"
        />

        <button
          onClick={handleJoin}
          className="w-full bg-pink-500 hover:bg-pink-600 transition p-3 rounded-lg text-white font-bold"
        >

          Join Room

        </button>

      </div>

    </div>

  )

}

export default JoinRoom