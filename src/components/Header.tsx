import { GAME_RESULT, GAME_STATES } from '@/Game'

export const Header = ({
  gameState,
  setGameState,
  gameResult,
  setIsSoundPlaying,
  isSoundPlaying,
  winCount,
  loseCount,
  roundCount,
  resetGame,
}: {
  gameState: 'choosing' | 'result' | null
  setGameState: (state: string) => void
  gameResult: 'win' | 'lose' | 'draw' | null
  setIsSoundPlaying: Function
  isSoundPlaying: boolean
  winCount: number
  loseCount: number
  roundCount: number
  resetGame: () => void
}) => {
  return (
    <>
      <div className='absolute z-10 top-0 left-0 w-full  '>
        <div className='flex shadow h-[80px] w-1/2 bg-opacity-50 bg-black m-auto rounded justify-around items-center'>
          <div className='inline mx-2'>
            <div className='text-white  font-bold mb-1'>Round</div>
            <div className='text-white text-center '>{roundCount}</div>
          </div>
          <div className='inline mx-2'>
            <div className='text-white  font-bold mb-1'>Computer</div>
            <div className='text-white text-center '>{loseCount}</div>
          </div>
          <div className='inline mx-2'>
            <div className='text-white  font-bold mb-1'>You</div>
            <div className='text-white text-center '>{winCount}</div>
          </div>
        </div>
        {gameState == GAME_STATES.result && (
          <>
            {gameResult == GAME_RESULT.win && (
              <div className=' text-6xl mt-12 mt animate-pulse bg-gradient-to-r p-1 from-white via-yellow-500 to-white bg-clip-text text-transparent font-bold  text-center '>
                Congratulations, YOU WIN
              </div>
            )}
            {gameResult == GAME_RESULT.lose && (
              <div className=' text-6xl mt-12 p-1 bg-black bg-clip-text text-transparent font-bold  text-center '>
                Sorry, YOU LOSE
              </div>
            )}
            {gameResult == GAME_RESULT.draw && (
              <div className=' text-6xl mt-12 p-1 bg-black bg-clip-text text-transparent font-bold  text-center '>
                DRAW
              </div>
            )}
            <div className='w-full flex mt-10 justify-center'>
              <button
                onClick={() => setGameState(GAME_STATES.choosing)}
                className=' hover:cursor-pointer text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center '
              >
                Replay
              </button>
            </div>
          </>
        )}
        {gameState == GAME_STATES.choosing && (
          <>
            <img src='/logo.jpeg' className='w-1/5 rounded-[10px] object-cover  m-auto mt-[50px] ' />
            <div className=' text-3xl font-bold text-center mt-[30px]  '>Pick Your Choice</div>
          </>
        )}
      </div>
      <button
        onClick={resetGame}
        className='absolute z-10 rounded-[10px] p-3 hover:bg-white left-0 top-0 mt-5 ml-5 hover:cursor-pointer  '
      >
        <img src='/refresh.svg' className='w-10 ' />
      </button>
      <button
        onClick={() => setIsSoundPlaying((isSoundPlaying) => !isSoundPlaying)}
        className='absolute z-10 rounded-[10px] p-3 hover:bg-white right-0 top-0 mt-5 mr-5 hover:cursor-pointer  '
      >
        {isSoundPlaying && <img src='/sound.svg' className='w-10 ' />}
        {!isSoundPlaying && <img src='/mute.svg' className='w-10 ' />}
      </button>
    </>
  )
}
