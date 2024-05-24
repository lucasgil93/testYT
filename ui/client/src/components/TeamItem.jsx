import React from "react"
import chefimg from "../assets/team/pexels-ivan-samkov-8951090.jpg"
import kitchenimg from "../assets/team/pexels-elletakesphotos-2696064.jpg"
import barman from "../assets/team/pexels-reneasmussen-3217157.jpg"
import waiter from "../assets/team/pexels-olly-3769144.jpg"

export default function OurTeam() {

    return (
        <section className="py-6 bg-white text-gray-800">
            <div className="container p-4 mx-auto space-y-16 sm:p-10">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold leading-none sm:text-5xl">Meet our team</h2>
                    <p className="max-w-2xl text-gray-600">The most daring can enjoy new flavors. Lovers of Japanese cuisine can also enjoy Sushi-Bar living a true gastronomic experience all served by our wonderful staff</p>
                </div>
                <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="flex space-x-6">
                        <img alt="" className="flex-1 flex-shrink-0 object-contain h-56 mb-4 bg-center rounded-sm bg-gray-100" src={chefimg} />
                        <div className="flex flex-col">
                            <h2 className="text-xl font-semibold">Ramsey Todoroki</h2>
                            <p className="text-sm text-gray-600">Head Chef</p>
                        </div>
                    </div>
                    <div className="flex space-x-6">
                        <img alt="" className="flex-1 flex-shrink-0 object-contain h-56 mb-4 bg-center rounded-sm bg-gray-100" src={kitchenimg} />
                        <div className="flex flex-col">
                            <h2 className="text-xl font-semibold">Mary Hill and Jeff Pratt</h2>
                            <p className="text-sm text-gray-600">Vous Chef</p>
                        </div>
                    </div>
                    <div className="flex space-x-6">
                        <img alt="" className="flex-1 flex-shrink-0 object-contain h-56 mb-4 bg-center rounded-sm bg-gray-100" src={barman} />
                        <div className="flex flex-col">
                            <h2 className="text-xl font-semibold">Adrien Smith</h2>
                            <p className="text-sm text-gray-600">Head Waiter</p>
                            
                        </div>
                    </div>
                    <div className="flex space-x-6">
                        <img alt="" className="flex-1 flex-shrink-0 object-contain h-56 mb-4 bg-center rounded-sm bg-gray-100" src={waiter} />
                        <div className="flex flex-col">
                            <h2 className="text-xl font-semibold">Phillip Patel</h2>
                            <p className="text-sm text-gray-600">Waiter</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}