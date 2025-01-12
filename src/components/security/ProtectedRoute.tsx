"use client";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectLoggedInId } from "@/config/redux/loggedIn.slice";
import { useRouter, usePathname } from "next/navigation";
import React, { ReactNode } from "react";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const loggedInId = useSelector(selectLoggedInId);
  const router = useRouter();
  const pathname = usePathname();


  useEffect(() => {
    if (!loggedInId) {
      // Save the current page path to localStorage before redirecting
      localStorage.setItem("pageBeforeLogin", pathname);
      // Redirect to login page
      router.push("/login");
    }
  }, [loggedInId, pathname, router]);

  // If user is not authenticated, render nothing while redirecting
  if (!loggedInId) {
    return null;
  }


  // Render the children (the protected content) if the user is authenticated
  return <>{children}</>;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
