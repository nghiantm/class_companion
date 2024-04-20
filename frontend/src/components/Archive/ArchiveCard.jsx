import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";

export default function ArchiveCard({ name, description }) {
    return (
        <Card className="ml-12 mt-6 w-72 h-48 bg-[#ffffff]">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    {name}
                </Typography>
                <Typography className="">
                    {description}
                </Typography>
            </CardBody>
                <div className="absolute bottom-1 w-full">
                    <CardFooter className="flex justify-between pt-0">
                        <Button>Summary</Button>

                        <Button>Practice</Button>
                    </CardFooter>
                </div>
        </Card>
    );
}