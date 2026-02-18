module.exports = grammar({
    name: "pageflow",
    
    extras: $ => [/\s/],
    
    rules: {
        source_file: $ => repeat($.element),
        
        element: $ => choice(
            $.newpage_block,
            $.section_block,
            $.content
        ),
        
        content: $ => choice(
            $.vstack_block,
            $.hstack_block,
            $.zstack_block,
            $.text_block,
            $.math_block,
            $.image_element,
            $.spacer_element,
            $.divider_element,
            $.listing_element,
            $.text_content,
            $.math_content
        ),
        
        newpage_block: $ => seq(
            "NewPage",
            "{",
            repeat($.newpage_content),
            "}",
            repeat($.newpage_modifier)
        ),
        newpage_content: $ => choice(
            $.section_block,
            $.content
        ),
        newpage_modifier: $ => seq(
            ".",
            choice(
                $.page_modifiers,
                $.inset_modifiers
            )
        ),
        
        section_block: $ => seq(
            "Section",
            "(",
            $.text_content,
            ")",
            "{",
            repeat($.section_content),
            "}"
        ),
        section_content: $ => choice(
            $.section_newpage_block,
            $.subsection_block,
            $.content
        ),
        section_newpage_block: $ => seq(
            "NewPage",
            "{",
            repeat($.section_newpage_content),
            "}",
            repeat($.newpage_modifier)
        ),
        section_newpage_content: $ => choice(
            $.subsection_block,
            $.content
        ),
        
        subsection_block: $ => seq(
            "SubSection",
            "(",
            $.text_content,
            ")",
            "{",
            repeat($.section_content),
            "}"
        ),
        subsection_title: $ => $.text_content,
        
        vstack_block: $ => seq(
            "VStack",
            "{",
            repeat($.content),
            "}",
            repeat($.vstack_modifier)
        ),
        vstack_modifier: $ => seq(
            ".",
            choice(
                $.frame_modifiers,
                $.layout_modifiers,
                $.inset_modifiers,
                $.container_modifiers,
                $.figure_modifiers,
                $.subfigure_modifiers,
                $.alignment_modifiers,
                $.background_modifiers,
                $.valignment_modifier
            )
        ),
        
        hstack_block: $ => seq(
            "HStack",
            "{",
            repeat($.content),
            "}",
            repeat($.hstack_modifier)
        ),
        hstack_modifier: $ => seq(
            ".",
            choice(
                $.frame_modifiers,
                $.layout_modifiers,
                $.inset_modifiers,
                $.container_modifiers,
                $.figure_modifiers,
                $.subfigure_modifiers,
                $.alignment_modifiers,
                $.background_modifiers,
                $.halignment_modifier
            )
        ),
        
        zstack_block: $ => seq(
            "ZStack",
            "{",
            repeat($.content),
            "}",
            repeat($.zstack_modifier)
        ),
        zstack_modifier: $ => seq(
            ".",
            choice(
                $.frame_modifiers,
                $.layout_modifiers,
                $.inset_modifiers,
                $.container_modifiers,
                $.figure_modifiers,
                $.subfigure_modifiers,
                $.alignment_modifiers,
                $.background_modifiers,
                $.zalignment_modifier
            )
        ),
        
        text_block: $ => seq(
            "Text",
            "{",
            $.text_content,
            "}",
            repeat($.text_modifier)
        ),
        text_modifier: $ => seq(
            ".",
            choice(
                $.text_layout_modifiers,
                $.text_editing_modifiers,
                $.font_modifiers,
                $.frame_modifiers,
                $.layout_modifiers,
                $.alignment_modifiers,
                $.foreground_modifiers,
                $.background_modifiers
            )
        ),
      
        math_block: $ => seq(
            "Math",
            "{",
            $.math_content,
            "}",
            repeat($.math_modifier)
        ),
        math_modifier: $ => seq(
            ".",
            choice(
                $.text_layout_modifiers,
                $.font_modifiers,
                $.frame_modifiers,
                $.layout_modifiers,
                $.alignment_modifiers,
                $.inset_modifiers,
                $.foreground_modifiers,
                $.background_modifiers
            )
        ),
        
        image_element: $ => seq(
            "Image",
            "(",
            $.file_name,
            ")",
            repeat($.image_modifier)
        ),
        image_modifier: $ => seq(
            ".",
            choice(
                $.frame_modifiers,
                $.layout_modifiers,
                $.alignment_modifiers,
                $.figure_modifiers,
                $.subfigure_modifiers
            )
        ),
        
        spacer_element: $ => seq(
            "Spacer",
            "(",
            $.expression,
            ")"
        ),
        
        divider_element: $ => seq(
            "Divider",
            "(",
            $.expression,
            ")",
            repeat($.divider_modifier)
        ),
        divider_modifier: $ => seq(
            ".",
            choice(
                $.frame_modifiers,
                $.layout_modifiers,
                $.alignment_modifiers,
                $.foreground_modifiers
            )
        ),
        
        listing_element: $ => seq(
            "Listing",
            "(",
            $.file_name,
            ")",
            repeat($.listing_modifier)
        ),
        listing_modifier: $ => seq(
            ".",
            choice(
                $.code_modifiers,
                $.font_modifiers,
                $.figure_modifiers
            )
        ),
      
        text_content: $ => seq(
            $.text_delimiter,
            repeat($.text_fragment),
            $.text_delimiter
        ),
        
        math_content: $ => seq(
            $.math_delimiter,
            repeat($.math_fragment),
            $.math_delimiter
        ),
        
        text_fragment: $ => choice(
            $.raw_text,
            $.math_content,
            $.newline
        ),
        
        math_fragment: $ => choice(
            $.math_text,
            $.newline
        ),
        
        page_modifiers: $ => choice(
            $.header_modifier,
            $.footer_modifier
        ),
        frame_modifiers: $ => choice(
            $.width_modifier,
            $.height_modifier
        ),
        alignment_modifiers: $ => $.layout_modifier,
        layout_modifiers: $ => choice(
            $.padding_modifier,
            $.offset_modifier
        ),
        inset_modifiers: $ => $.margin_modifier,
        figure_modifiers: $ => choice(
            $.enumerated_modifier,
            $.caption_modifier
        ),
        subfigure_modifiers: $ => $.subfigure_modifier,
        container_modifiers: $ => $.spacing_modifier,
        foreground_modifiers: $ => $.tint_modifier,
        background_modifiers: $ => $.background_modifier,
        text_layout_modifiers: $ => choice(
            $.text_alignment_modifier,
            $.line_spacing_modifier
        ),
        text_editing_modifiers: $ => choice(
            $.underline_modifier,
            $.strikethrough_modifier
        ),
        font_modifiers: $ => choice(
            $.font_size_modifier,
            $.font_style_modifier
        ),
        code_modifiers: $ => choice(
            $.code_language_modifier,
            $.code_style_modifier,
            $.code_frame_modifier,
            $.code_numbers_modifier
        ),
        
        valignment_modifier: $ => seq(
            "alignment",
            "(",
            $.horizontal_alignment_type,
            ")"
        ),
        halignment_modifier: $ => seq(
            "alignment",
            "(",
            $.vertical_alignment_type,
            ")"
        ),
        zalignment_modifier: $ => seq(
            "alignment",
            "(",
            $.alignment_type,
            ")"
        ),
        
        header_modifier: $ => seq(
            "header",
            "(",
            $.text_content,
            ")"
        ),
        
        footer_modifier: $ => seq(
            "footer",
            "(",
            $.text_content,
            ")"
        ),
        
        width_modifier: $ => seq(
            "width",
            "(",
            $.expression,
            ")"
        ),
        height_modifier: $ => seq(
            "height",
            "(",
            $.expression,
            ")"
        ),
        
        layout_modifier: $ => seq(
            "layout",
            "(",
            $.alignment_type,
            ")"
        ),
        
        padding_modifier: $ => seq(
            "padding",
            "(",
            $.edge_type,
            ",",
            $.expression,
            ")"
        ),
        offset_modifier: $ => seq(
            "offset",
            "(",
            $.axis_type,
            ",",
            $.expression,
            ")"
        ),
        
        margin_modifier: $ => seq(
            "margin",
            "(",
            $.edge_type,
            ",",
            $.expression,
            ")"
        ),
        
        enumerated_modifier: $ => seq(
            "enumerated",
            "(",
            $.bool_type,
            ")"
        ),
        caption_modifier: $ => seq(
            "caption",
            "(",
            $.text_content,
            ")"
        ),
        
        subfigure_modifier: $ => seq(
            "subfigure",
            "(",
            $.bool_type,
            ")"
        ),
        
        spacing_modifier: $ => seq(
            "spacing",
            "(",
            $.expression,
            ")"
        ),
        
        tint_modifier: $ => seq(
            "tint",
            "(",
            $.color_type,
            ")"
        ),
        
        background_modifier: $ => seq(
            "background",
            "(",
            $.color_type,
            ")"
        ),
        
        text_alignment_modifier: $ => seq(
            "textAlignment",
            "(",
            $.horizontal_alignment_type,
            ")"
        ),
        line_spacing_modifier: $ => seq(
            "lineSpacing",
            "(",
            $.expression,
            ")"
        ),
        
        underline_modifier: $ => seq(
            "underline",
            "(",
            $.line_pattern_type,
            ",",
            $.color_type,
            ")"
        ),
        strikethrough_modifier: $ => seq(
            "strikethrough",
            "(",
            $.line_pattern_type,
            ",",
            $.color_type,
            ")"
        ),
        
        font_size_modifier: $ => seq(
            "fontSize",
            "(",
            $.font_size_type,
            ")"
        ),
        font_style_modifier: $ => seq(
            "fontStyle",
            "(",
            $.font_style_type,
            ")"
        ),
        
        code_language_modifier: $ => seq(
            "language",
            "(",
            $.code_language_type,
            ")"
        ),
        code_style_modifier: $ => seq(
            "style",
            "(",
            $.code_style_type,
            ")"
        ),
        code_frame_modifier: $ => seq(
            "frame",
            "(",
            $.code_frame_type,
            ")"
        ),
        code_numbers_modifier: $ => seq(
            "numbers",
            "(",
            $.bool_type,
            ")"
        ),
        
        expression: $ => prec.left(
            1,
            choice(
                $.term,
                seq($.expression, $.add_operation, $.term)
            )
        ),

        term: $ => prec.left(
            2,
            choice(
                $.factor,
                seq($.term, $.mul_operation, $.factor)
            )
        ),
        
        factor: $ => choice(
            $.unary_factor,
            $.primary_factor
        ),
        unary_factor: $ => seq(
            $.add_operation,
            $.primary_factor
        ),
        primary_factor: $ => choice(
            seq(
                "(",
                $.expression,
                ")"
            ),
            $.constant,
            $.number
        ),
        
        add_operation: $ => choice("+", "-"),
        mul_operation: $ => choice("*", "/"),
        
        constant: $ => choice("@width", "@height"),
        number: $ => seq(
            $.number_type,
            optional($.measure_unit)
        ),
        measure_unit: $ => token.immediate(/pt|cm|mm|in/),
        
        number_type: $ => choice($.integer, $.decimal),
        bool_type: $ => choice("true", "false"),
        
        integer: $ => /[1-9][0-9]*/,
        decimal: $ => /[0-9]+\.[0-9]+/,
        
        raw_text: $ => token(
            repeat1(
                choice(
                    /[^\\"$]/,
                    seq("\\", /[^\\]/)
                )
            )
        ),
        
        math_text: $ => token(
            repeat1(
                choice(
                    /[^\\$]/,
                    seq("\\", /[^\\]/)
                )
            )
        ),
        
        newline: $ => "\\\\",
        text_delimiter: $ => "\"",
        math_delimiter: $ => "$",
        
        file_name: $ => /[a-zA-Z0-9_\-]+/,
        
        horizontal_alignment_type: $ => seq(
            optional("HorizontalAlignment"),
            seq(".", $.horizontal_alignment_value)
        ),
        horizontal_alignment_value: $ => choice(
            "center",
            "leading",
            "trailing"
        ),
        
        vertical_alignment_type: $ => seq(
            optional("VerticalAlignment"),
            seq(".", $.vertical_alignment_value)
        ),
        vertical_alignment_value: $ => choice(
            "center",
            "top",
            "bottom"
        ),
        
        alignment_type: $ => seq(
            optional("Alignment"),
            seq(".", $.alignment_value)
        ),
        alignment_value: $ => choice(
            "center",
            "leading",
            "trailing",
            "top",
            "bottom",
            "topLeading",
            "topTrailing",
            "bottomLeading",
            "bottomTrailing"
        ),
        
        edge_type: $ => seq(
            optional("Edge"),
            seq(".", $.edge_value)
        ),
        edge_value: $ => choice(
            "top",
            "bottom",
            "leading",
            "trailing",
            "all"
        ),
        
        axis_type: $ => seq(
            optional("Axis"),
            seq(".", $.axis_value)
        ),
        axis_value: $ => choice(
            "vertical",
            "horizontal"
        ),
        
        color_type: $ => seq(
            optional("Color"),
            seq(".", $.color_value)
        ),
        color_value: $ => choice(
            "red", "green", "blue", "cyan", "magenta", "yellow",
            "black", "gray", "white", "darkGray", "lightGray",
            "brown", "lime", "olive", "orange", "pink", "purple",
            "teal", "violet"
        ),
        
        line_pattern_type: $ => seq(
            optional("LinePattern"),
            seq(".", $.line_pattern_value)
        ),
        line_pattern_value: $ => choice(
            "dash",
            "dashDot",
            "dashDotDot",
            "dot",
            "solid"
        ),
        
        font_size_type: $ => seq(
            optional("FontSize"),
            seq(".", $.font_size_value)
        ),
        font_size_value: $ => choice(
            "tiny",
            "script",
            "footnote",
            "small",
            "normal",
            "large",
            "larger",
            "largest",
            "huge",
            "hugest"
        ),
        
        font_style_type: $ => seq(
            optional("FontStyle"),
            seq(".", $.font_style_value)
        ),
        font_style_value: $ => choice(
            "medium",
            "bold",
            "italic",
            "monospaced",
            "smallCaps"
        ),
        
        code_language_type: $ => seq(
            optional("CodeLanguage"),
            seq(".", $.code_language_value)
        ),
        code_language_value: $ => choice(
            "cucumber", "abap", "ada", "ahk", "antlr", "apacheconf",
            "applescript", "as", "aspectj", "autoit", "asy", "awk",
            "basemake", "bash", "bat", "bbcode", "befunge", "bmax", "boo",
            "brainfuck", "bro", "bugs", "c", "ceylon", "cfm", "cfs", "cheetah",
            "clj", "cmake", "cobol", "cl", "console", "control", "coq", "cpp",
            "croc", "csharp", "css", "cuda", "cyx", "d", "dg", "diff", "django",
            "dpatch", "duel", "dylan", "ec", "erb", "evoque", "fan", "fancy",
            "fortran", "gas", "genshi", "glsl", "gnuplot", "go", "gosu",
            "groovy", "gst", "haml", "haskell", "hxml", "html", "http", "hx",
            "idl", "irc", "ini", "java", "jade", "js", "json", "jsp", "kconfig",
            "koka", "lasso", "livescrit", "llvm", "logos", "lua", "mako",
            "mason", "matlab", "minid", "monkey", "moon", "mxml", "myghty",
            "mysql", "nasm", "newlisp", "newspeak", "numpy", "ocaml",
            "octave", "ooc", "perl", "php", "plpgsql", "postgresql",
            "postscript", "pot", "prolog", "psql", "puppet", "python",
            "qml", "ragel", "raw", "ruby", "rhtml", "sass", "scheme",
            "smalltalk", "sql", "ssp", "tcl", "tea", "tex", "text",
            "vala", "vgl", "xml", "xquery", "yaml"
        ),
        
        code_style_type: $ => seq(
            optional("CodeStyle"),
            seq(".", $.code_style_value)
        ),
        code_style_value: $ => choice(
            "manni", "fruity", "rrt", "autumn", "perldoc", "bw", "borland",
            "emacs", "colorful", "vim", "murphy", "pastie", "vs", "friendly",
            "trac", "native", "tango", "monokai"
        ),
        
        code_frame_type: $ => seq(
            optional("CodeFrame"),
            seq(".", $.code_frame_value)
        ),
        code_frame_value: $ => choice(
            "lefline",
            "topline",
            "bottomline",
            "lines",
            "single"
        )
    }
})
