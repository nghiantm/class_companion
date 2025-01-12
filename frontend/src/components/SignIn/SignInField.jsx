import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Link } from "@mui/material";

export default function SignInField({ 
    passwordShown,
    togglePasswordVisiblity,
    handleFieldChange, 
    handleSubmit 
}) {
    return (
        <div className="text-center p-8">
            <Typography variant="h3" className="mb-2 text-[#468e2b] font-mont">
                Welcome back
            </Typography>
            <div className="mx-auto max-w-[24rem] text-left">
                <div className="mb-6">
                    <label htmlFor="email">
                    <Typography
                        variant="small"
                        className="mb-2 block font-medium text-gray-900"
                    >
                        Your Email
                    </Typography>
                    </label>
                    <Input
                        id="email"
                        color="gray"
                        size="lg"
                        type="email"
                        name="email"
                        onChange={handleFieldChange}
                        placeholder="name@mail.com"
                        variant="outlined"
                        className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password">
                    <Typography
                        variant="small"
                        className="mb-2 block font-medium text-gray-900"
                    >
                        Password
                    </Typography>
                    </label>
                    <Input
                        size="lg"
                        placeholder="********"
                        id="password"
                        name="password"
                        onChange={handleFieldChange}
                        variant="outlined"
                        className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                        type={passwordShown ? "text" : "password"}
                        icon={
                            <i onClick={togglePasswordVisiblity}>
                            {passwordShown ? (
                                <EyeIcon className="h-5 w-5" />
                            ) : (
                                <EyeSlashIcon className="h-5 w-5" />
                            )}
                            </i>
                        }
                    />
                </div>

                <Button 
                    color="gray" 
                    size="lg" 
                    className="mt-6 bg-[#468e2b]"
                    onClick={handleSubmit}
                    fullWidth>
                    sign in
                </Button>

                <Typography
                    variant="small"
                    color="gray"
                    className="mt-4 text-center font-normal"
                >
                    Not registered?{" "}
                    <Link href={"/sign-up"} className="font-medium text-gray-900">
                    Sign up
                    </Link>
                </Typography>
            </div>
        </div>
    )
}