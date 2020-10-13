import { path } from "./safe";
export const getTmpl = (tmpl) => {
    const parts = [];
    const keymap = {};
    const len = tmpl.length;
    let i = 0, s, ln, start = 0, open = false;
    for (i = 0; i < len; i++) {
        s = tmpl[i];
        switch (s) {
            case '{':
                open = true;
                start = i;
                break;
            case '}':
                open = false;
                parts.push('');
                keymap[parts.length - 1] = tmpl.slice(start + 1, i);
                break;
            default:
                if (!open) {
                    ln = parts.length - 1;
                    if (ln < 0) {
                        parts.push('');
                        ln++;
                    }
                    parts[ln] += s;
                }
                break;
        }
    }
    return (data) => {
        const out = [];
        const ln = parts.length - 1;
        for (const j in parts) {
            i = +j;
            out.push(parts[i]);
            if (i !== ln)
                out.push(path(keymap[i].split('.'), data));
        }
        return out.join('');
    };
};
