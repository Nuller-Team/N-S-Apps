import Layout from "@/components/Layout.tsx";
import Head from "@/components/Head.tsx";
import { State } from "@/routes/_middleware.ts";

interface DisabledAppProps {
    title: string;
    url: string;
    state: State;
}

export default function DisabledApp({ title, url, state }: DisabledAppProps) {
    return (
        <>
            <section class="bg-white py-8 md:py-12">
                <div class="container mx-auto px-4">
                    <div
                        class="font-semibold text-center py-64"
                    >
                        <h1 class="text-black text-5xl md:text-7xl">
                            {title}
                        </h1>
                        <div class="mt-4">
                            <p class="text-lg text-gray-600">
                                申し訳ございませんが、このサービスの提供を終了いたしました。
                            </p>
                            <p class="text-lg text-gray-600">
                                長らくご利用いただき、ありがとうございました。
                            </p>
                        </div>
                        <div class="pt-4">
                            <a
                                href="/"
                                class="inline-block text-white bg-blue-500 border-blue-500 px-6 py-2 text-lg transition border-2 duration-300 rounded-lg hover:opacity-90"
                            >
                                ホームに戻る
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}