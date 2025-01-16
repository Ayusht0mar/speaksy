import UrlInput from "../components/url-input";

export default function Page(): JSX.Element {
  return (
    <div>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="flex flex-col gap-2 pb-8 items-center">
          <h1 className="text-3xl text-green-500 font-semibold ">Speaksy</h1>
          <p className="text-neutral-200 max-w-sm text-balance text-center ">Speak to any website and save time reading the whole page.</p>
        </div>
        <UrlInput/>
        <p className="w-[92vw] max-w-md mt-4 text-neutral-400 text-balance text-center">Note: Depending Upon your distance from the server you might face a delay in response. <br /> Thank You for the patience</p>
        <p className="text-neutral-300 mt-4">Built by <a href="https://www.ayushtomar.in/">Ayush Tomar</a></p>
      </div>
    </div>
  );
}
