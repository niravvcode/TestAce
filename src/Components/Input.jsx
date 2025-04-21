import React from "react";
import { Input } from "@material-tailwind/react";
import { User } from "lucide-react";

const UserInput = React.forwardRef(
  ({ label, placeholder, Icon = User, ...rest }, ref) => {
    return (
      <div className="relative w-full">
        {/* Floating Icon */}
        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center w-7 h-7 bg-blue-100 text-blue-600 rounded-full border-1 border-blue-200">
          <Icon className="h-4 w-4" />
        </div>

        {/* Input Field */}
        <Input
          {...rest}
          inputRef={ref} // IMPORTANT for react-hook-form
          variant="standard"
          label={label}
          placeholder={placeholder}
          className="w-full"
        />
      </div>
    );
  }
);

export { UserInput };
