import TopNavbar from "./TopNavbar";
import { useNavigate } from "react-router-dom";
import {Card, CardHeader, CardBody, Image, Button} from "@nextui-org/react";
import { BoardIconSVG } from "./Icons/BoardIconSVG";
import { GithubIcon } from "./Icons/GithubIcon";

export default function AboutPage(){
    let navigate = useNavigate();
    const redirectToDasboard = () =>{ 
        let path = 'dashboard';
        navigate(path);
    }

    return(
        <div className="container-fluid h-dvh">
            <TopNavbar activePage="About" />
            <br/><br/>
            <div className="px-24">
                <div className="mx-auto">
                    <h1 className="text-5xl text-center pt-3 font-bold">What Is <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500">KanbanMaestro?</span></h1>
                </div>
                <br/><br/><br/>
                <div className="flex">
                    <div className="w-3/4 px-3">
                        <Card className="py-4">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <h4 className="font-bold text-large">Seamless Task Management</h4>
                                <small className="text-default-500">Streamline your workflow effortlessly with KanbanMaestro&apos;s powerful yet simple design!</small>
                            </CardHeader>
                            <CardBody className="overflow-visible py-2">
                                <Image
                                    alt="Card background"
                                    className="object-cover rounded-xl"
                                    src="/images/hero-card-complete.jpeg"
                                    width={270}
                                />
                            </CardBody>
                        </Card>
                    </div>
                    <div className="w-1/4">
                        <Card className="py-4">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <h4 className="font-bold text-large">Local Data</h4>
                                <small className="text-default-500">You are in control of all your data!</small>
                            </CardHeader>
                            <CardBody className="overflow-visible py-2">
                                <Image
                                alt="Card background"
                                className="object-cover rounded-xl"
                                src="/images/hero-card-complete.jpeg"
                                width={270}
                                />
                            </CardBody>
                        </Card>
                    </div>
                </div>
                <div className="flex pt-3">
                    <div className="w-1/4 px-3">
                        <Card className="py-4">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <h4 className="font-bold text-large">No account creation required</h4>
                                <small className="text-default-500">Jump straight into your boards!</small>
                            </CardHeader>
                            <CardBody className="overflow-visible py-2">
                                <Image
                                alt="Card background"
                                className="object-cover rounded-xl"
                                width={270}
                                />
                            </CardBody>
                        </Card>
                    </div>
                    <div className="w-2/4 pr-3">
                        <Card className="py-4">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <h4 className="font-bold text-large">Open Source</h4>
                                <small className="text-default-500">Contribute to KanbanMaestro&apos;s open-source community or customize the tool to fit your specific needs!</small>
                            </CardHeader>
                            <CardBody className="overflow-visible py-2">
                                <Image
                                alt="Card background"
                                className="object-cover rounded-xl"
                                src="/images/hero-card-complete.jpeg"
                                width={270}
                                />
                            </CardBody>
                        </Card>
                    </div>
                    <div className="w-1/4">
                        <Card className="py-4">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <h4 className="font-bold text-large">Privacy-First</h4>
                                <small className="text-default-500">We prioritize the privacy of your data!</small>
                            </CardHeader>
                            <CardBody className="overflow-visible py-2">
                                <Image
                                alt="Card background"
                                className="object-cover rounded-xl"
                                src="/images/hero-card-complete.jpeg"
                                width={270}
                                />
                            </CardBody>
                        </Card>
                    </div>
                </div>
                <br/><br/>
                <div className="flex content-center mx-auto justify-center gap-2">
                    <Button color="default" variant="solid" startContent={GithubIcon} onPress={() => {
                        window.open("https://github.com/Takayuki0x/Kanban-Maestro", '_blank')
                    }}>
                        Check out the repo
                    </Button>
                    <Button color="danger" variant="solid" startContent={BoardIconSVG} onPress={redirectToDasboard}>
                        Go to your boards
                    </Button>
                </div>
            </div>
        </div>
    )
}
