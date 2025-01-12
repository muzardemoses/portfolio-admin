"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSavedColor } from "@/hooks/colors/getSavedColor";



export const AuthLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const router = useRouter();

    const savedColor = useSavedColor();

    return (
        <div className="flex flex-row w-full gap-40 overflow-hidden h-screen 2xl:gap-16 xl:gap-0">
            <div className="w-[43.19%] relative flex lg:hidden">
                <div className="z-10 px-9 bg-black bg-opacity-50 w-full h-full flex flex-col gap-6 justify-center items-center">
                    <h3
                        className="text-center text-5xl font-bold"
                        style={{
                            lineHeight: "3.5rem",
                            color: savedColor.main,
                        }}
                    >
                        My Portfolio Admin Dashboard
                    </h3>
                    <p className="text-white text-center text-2xl font-medium leading-normal xl:text-xl">
                        Welcome back! Please login to your account
                    </p>
                </div>
                <Image
                    src="/assets/images/auth/portfolio.jpg"
                    height={1200}
                    width={1200}
                    alt="Portfolio Image"
                    className="z-0 absolute top-0 left-0 w-full h-full object-cover"
                />
            </div>
            <div className="flex-grow overflow-auto pl-8 pr-28 relative z-20 xl:pr-16 lg:px-20 lg:pl-0 lg:pr-0 lg:py-5 sm:w-full sm:px-4">
                {children}
                <div className="absolute right-10 top-10 xl:right-5">
                    <button
                        onClick={() => router.back()}
                        className="bg-white rounded-full flex gap-1 items-center"
                    >
                        <FontAwesomeIcon
                            icon={faArrowCircleLeft}
                            className="w-8 h-8 xl:h-6 xl:w-6"
                        />
                        <p className="text-sm text-black">Back</p>
                    </button>
                </div>
            </div>
        </div>
    );
};
