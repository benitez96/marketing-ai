import { BackgroundBeams } from "@/components/BackgroundBeams";
import { BackgroundGradient } from "@/components/BackgroundGradient";
import { Spacer } from "@nextui-org/react";
import React from "react";
import { FaCheck } from "react-icons/fa";

export default function Home() {
  return (
    <main className="container mx-auto">
      <section className="flex justify-center items-center min-h-[100dvh]">
        <div className="text-center leading-8 md:leading-10 max-w-xl">
          <div className="inline-block">
            <h1 className="tracking-tight inline font-semibold text-[2.5rem] lg:text-5xl">
              Make email marketing easier with&nbsp;
            </h1>
            <h1 className="tracking-tight inline font-semibold from-primary to-secondary text-[2.5rem] lg:text-5xl bg-clip-text text-transparent bg-gradient-to-b">
              Marketing AI&nbsp;
            </h1>
          </div>
          <h1 className="tracking-tight inline font-semibold text-[2.5rem] lg:text-5xl">
            the AI-powered email marketing tool.
          </h1>
        </div>
      </section>
      <section className="flex justify-center items-center flex-col">
        <h3 className="text-secondary text-md">
          Pricing
        </h3>
        <h1 className="text-3xl font-medium tracking-tight">
          Get the best product for you.
        </h1>
        <Spacer y={8} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 py-2">
          <div className="flex flex-col relative height-auto text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-lg bg-background/80 backdrop-blur-md backdrop-saturate-150 transition-transform-background motion-reduce:transition-none overflow-visible !border-small p-3 dark:bg-black/40 border-white/10 lg:mt-8">
            <div className="p-3 z-10 w-full justify-start shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large flex flex-col items-start gap-2 pb-6">
              <h2 className="text-large font-medium">Solo Plan</h2>
              <p className="text-medium text-default-500">Tailored for individual professionals and hobbyists.</p>
            </div>
            <hr className="shrink-0 border-none w-full h-divider bg-default-200/50" role="separator" />
            <div className="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased gap-4">
              <div className="flex items-center gap-1 pt-2">
                <span className="inline text-2xl font-medium text-default-500 antialiased">$</span>
                <span className="inline text-4xl font-extrabold antialiased">12</span>
                <div className="ml-2 flex flex-col">
                  <span className="text-tiny font-semibold">one-time payment</span>
                  <span className="text-tiny text-default-500">plus local taxes</span>
                </div>
              </div>
              <ul className="flex flex-col gap-2">
                <li className="flex items-center gap-2"><FaCheck className="text-default-500"/><p className="text-default-500">Single user license</p>
                </li>
                <li className="flex items-center gap-2"><FaCheck className="text-default-500"/><p className="text-default-500">Access to all components</p>
                </li>
                <li className="flex items-center gap-2"><FaCheck className="text-default-500"/><p className="text-default-500">Lifetime access</p></li>
                <li className="flex items-center gap-2"><FaCheck className="text-default-500"/><p className="text-default-500">Unlimited projects</p>
                </li>
                <li className="flex items-center gap-2"><FaCheck className="text-default-500"/><p className="text-default-500">Customer support</p>
                </li>
                <li className="flex items-center gap-2"><FaCheck className="text-default-500"/><p className="text-default-500">Free updates</p>
                </li>
              </ul>
            </div>
            <div className="p-3 h-auto flex w-full items-center overflow-hidden color-inherit subpixel-antialiased rounded-b-large">
              <button className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-medium w-full [&amp;>svg]:max-w-[theme(spacing.unit-8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none data-[hover=true]:opacity-hover bg-default-200/50 text-white" type="button">Buy now</button>
            </div>
          </div>

          <BackgroundGradient className="rounded-lg bg-white dark:bg-zinc-900">
            <div className="flex flex-col relative height-full text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-lg bg-background/80 backdrop-blur-md backdrop-saturate-150 transition-transform-background motion-reduce:transition-none overflow-visible !border-small p-3 dark:bg-black/40 border-white/10">
              <div className="p-3 z-10 w-full justify-start shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large flex flex-col items-start gap-2 pb-6">
                <h2 className="text-large font-medium">Pro Plan</h2>
                <p className="text-medium text-default-500">Tailored for individual professionals and hobbyists.</p>
              </div>
              <hr className="shrink-0 border-none w-full h-divider bg-default-200/50" role="separator" />
              <div className="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased gap-4">
                <div className="flex items-center gap-1 pt-2">
                  <span className="inline text-2xl font-medium text-default-500 antialiased">$</span>
                  <span className="inline text-4xl font-extrabold antialiased">49</span>
                  <div className="ml-2 flex flex-col">
                    <span className="text-tiny font-semibold">one-time payment</span>
                    <span className="text-tiny text-default-500">plus local taxes</span>
                  </div>
                </div>
                <ul className="flex flex-col gap-2">
                  <li className="flex items-center gap-2"><FaCheck className="text-default-500"/><p className="text-default-500">Single user license</p>
                  </li>
                  <li className="flex items-center gap-2"><FaCheck className="text-default-500"/><p className="text-default-500">Access to all components</p>
                  </li>
                  <li className="flex items-center gap-2"><FaCheck className="text-default-500"/><p className="text-default-500">Lifetime access</p></li>
                  <li className="flex items-center gap-2"><FaCheck className="text-default-500"/><p className="text-default-500">Unlimited projects</p>
                  </li>
                  <li className="flex items-center gap-2"><FaCheck className="text-default-500"/><p className="text-default-500">Customer support</p>
                  </li>
                  <li className="flex items-center gap-2"><FaCheck className="text-default-500"/><p className="text-default-500">Free updates</p>
                  </li>
                </ul>
              </div>
              <div className="p-3 h-auto flex w-full items-center overflow-hidden color-inherit subpixel-antialiased rounded-b-large">
                <button className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-medium w-full [&amp;>svg]:max-w-[theme(spacing.unit-8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none data-[hover=true]:opacity-hover bg-default-200/50 text-white" type="button">Buy now</button>
              </div>
            </div>
          </BackgroundGradient>
          <div className="flex flex-col relative height-auto text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-lg bg-background/80 backdrop-blur-md backdrop-saturate-150 transition-transform-background motion-reduce:transition-none overflow-visible !border-small p-3 dark:bg-black/40 border-white/10 lg:mt-8">
            <div className="p-3 z-10 w-full justify-start shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large flex flex-col items-start gap-2 pb-6">
              <h2 className="text-large font-medium">Enterprice Plan</h2>
              <p className="text-medium text-default-500">Tailored for individual professionals and hobbyists.</p>
            </div>
            <hr className="shrink-0 border-none w-full h-divider bg-default-200/50" role="separator" />
            <div className="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased gap-4">
              <div className="flex items-center gap-1 pt-2">
                <span className="inline text-2xl font-medium text-default-500 antialiased">$</span>
                <span className="inline text-4xl font-extrabold antialiased">249</span>
                <div className="ml-2 flex flex-col">
                  <span className="text-tiny font-semibold">one-time payment</span>
                  <span className="text-tiny text-default-500">plus local taxes</span>
                </div>
              </div>
              <ul className="flex flex-col gap-2">
                <li className="flex items-center gap-2"><FaCheck className="text-default-500"/><p className="text-default-500">Single user license</p>
                </li>
                <li className="flex items-center gap-2"><FaCheck className="text-default-500"/><p className="text-default-500">Access to all components</p>
                </li>
                <li className="flex items-center gap-2"><FaCheck className="text-default-500"/><p className="text-default-500">Lifetime access</p></li>
                <li className="flex items-center gap-2"><FaCheck className="text-default-500"/><p className="text-default-500">Unlimited projects</p>
                </li>
                <li className="flex items-center gap-2"><FaCheck className="text-default-500"/><p className="text-default-500">Customer support</p>
                </li>
                <li className="flex items-center gap-2"><FaCheck className="text-default-500"/><p className="text-default-500">Free updates</p>
                </li>
              </ul>
            </div>
            <div className="p-3 h-auto flex w-full items-center overflow-hidden color-inherit subpixel-antialiased rounded-b-large">
              <button className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-medium w-full [&amp;>svg]:max-w-[theme(spacing.unit-8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none data-[hover=true]:opacity-hover bg-default-200/50 text-white" type="button">Buy now</button>
            </div>
          </div>
        </div>
      </section>
      <BackgroundBeams />
    </main>
  );
}
