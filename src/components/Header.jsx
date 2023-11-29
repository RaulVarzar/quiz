export default function Header({onStart}){
    return(
        <div className="content-center flex-none my-auto text-center align-middle">
            <h1 className="text-4xl font-bold align-middle lg:text-6xl">REACT QUIZ</h1>
            <p className="my-3 italic text-md lg:text-lg">How much do you know about React? Test your knowledge with this quiz!</p>
            <button className="transition duration-300 btn btn-neutral elevation-6 hover:elevation-1" onClick={onStart}>START QUIZ</button>
        </div>
    )
}