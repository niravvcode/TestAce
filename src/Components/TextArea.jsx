import { Textarea } from "@material-tailwind/react";
import { User } from "lucide-react";
import React, { forwardRef } from "react";

const TextArea = forwardRef(({ placeholder, Icon = User, ...rest }, ref) => {
  return (
    <div className="relative w-full">
      {/* Floating Icon */}
      <div className="absolute right-1 top-8 -translate-y-1/2 flex items-center justify-center w-7 h-7 bg-blue-100 text-blue-600 rounded-lg border-1 border-blue-200">
        <Icon className="h-4 w-4" />
      </div>

      {/* Input Field */}
      <div>
        <Textarea
          ref={ref}
          
          {...rest}
          variant="standard"
          label={placeholder}
          className="w-full"
        />
      </div>
    </div>
  );
});

export default TextArea;