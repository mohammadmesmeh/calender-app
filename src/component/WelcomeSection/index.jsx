export const WelcomeSection = () => {
    return (
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white mb-6 h-fit mt-6 flex items-center justify-between mx-auto w-full max-w-4xl  group ">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        {/* <Sparkles className="w-5 h-5" /> */}
                        <span className="text-indigo-100">Welcome back,</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-3">John Doe!</h2>
                    <p className="text-indigo-100 text-lg">
                        You have tasks pending for today.
                        Keep up the great work!
                    </p>
                </div>

                {/* <div className="flex items-center gap-8">
             <div className="relative">
             {/* <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r={radius}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r={radius}
                stroke="white"
                strokeWidth="8"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg> */}
                {/* <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-3xl font-bold">{Math.round(progress)}%</span>
              <span className="text-xs text-indigo-100">Complete</span>
            </div>
          </div> */}

                <div className="w-40 h-40 opacity-30">
                    <svg viewBox="0 0 200 200" className="w-full h-full group-hover:rotate-180 transition-transform duration-500">
                        <path
                            d="M100 20 L120 80 L180 80 L135 120 L155 180 L100 145 L45 180 L65 120 L20 80 L80 80 Z"
                            fill="white"
                        />
                    </svg>
                </div>
            </div>
        </div>
    
    )
}
