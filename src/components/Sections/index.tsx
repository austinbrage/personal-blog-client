import { DateText } from './DateText'
import { type ArticleInfo } from "../../types/articles"

type Props = {
    currentArticle: ArticleInfo['fullData'] | null
}

export function Sections({ currentArticle }: Props) {

    if(!currentArticle) return

    return (
        <section>
            <div className="text-white">

                <DateText date={currentArticle.created_at}/>
                
                <h4 className="ms-5 text-4xl font-bold">
                    {currentArticle.title}
                </h4>
                
                <p className="ms-10 mt-10 text-2xl font-semibold">
                    {currentArticle.description}
                </p>

            </div>
        </section>
    )
}