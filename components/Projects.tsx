export interface Project {
  image: string;
  title: string;
  link: string;
  njr: boolean;
  enabled?: boolean;
}
interface ProjectProps {
  items: Project[];
  class?: string;
}

export default function Projects(props: ProjectProps) {
  return (
    <div
      class={`pt-8 grid grid-cols-1 md:grid-cols-3 items-center ${props.class ?? ""
        }`}
    >
      {props.items
        .filter((item) => item.link.length > 0 && item.enabled !== false)
        .map((project) => (
          <div class="w-full max-w-sm mx-auto group">
            <a href={project.link} tabIndex={-1}>
              <img
                loading="lazy"
                src={`/ns-app/${project.image}.png`}
                alt={project.title}
                width={600}
                height={337}
                style={{ aspectRatio: "16/9" }}
                class="object-cover shadow-lg group-hover:(shadow-xl opacity-70) rounded-lg"
              />
            </a>
            <div class="mt-4 flex items-center">
              <div class="text(lg gray-600) flex-1 group-hover:text-underline">
                <a href={project.link}>{project.title}</a>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
