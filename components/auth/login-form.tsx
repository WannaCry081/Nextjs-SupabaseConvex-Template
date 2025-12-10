"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Activity, useState, useTransition } from "react";
import { CheckIcon, CircleAlertIcon, GalleryVerticalEnd } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { getSupabaseClient } from "@/lib/supabase/client";

export const LoginForm = () => {
  const router = useRouter();
  const supabase = getSupabaseClient();

  const [isPending, startTransition] = useTransition();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<{ type: string; text: string } | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      setMessage(null);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage({ type: "Error", text: error.message });
      } else {
        setMessage({ type: "Success", text: "Login successful!" });
        router.push("/dashboard");
      }
    });
  };

  const handleSignInWithGoogle = async () => {
    startTransition(async () => {
      setMessage(null);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setMessage({ type: "Error", text: error.message });
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to Acme Inc.</h1>
            <FieldDescription>
              Don&apos;t have an account?{" "}
              <Link href="/auth/register">Sign up</Link>
            </FieldDescription>
          </div>
          {message?.text !== "" && <p>{message?.text}</p>}
          <div className="space-y-4">
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>
            <Activity mode={message !== null ? "visible" : "hidden"}>
              <Alert>
                {message?.type === "Success" ? (
                  <CheckIcon />
                ) : (
                  <CircleAlertIcon />
                )}
                <AlertTitle>{message?.type}</AlertTitle>
                <AlertDescription>{message?.text}</AlertDescription>
              </Alert>
            </Activity>
          </div>
          <Field>
            <Button type="submit" disabled={isPending}>
              Login
            </Button>
          </Field>
          <FieldSeparator>or</FieldSeparator>
          <Field className="flex">
            <Button
              variant="outline"
              type="button"
              disabled={isPending}
              onClick={handleSignInWithGoogle}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Continue with Google
            </Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
};
