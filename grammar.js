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
            token.immediate("alignment"),
            "(",
            $.horizontal_alignment_type,
            ")"
        ),
        halignment_modifier: $ => seq(
            token.immediate("alignment"),
            "(",
            $.vertical_alignment_type,
            ")"
        ),
        zalignment_modifier: $ => seq(
            token.immediate("alignment"),
            "(",
            $.alignment_type,
            ")"
        ),
        
        header_modifier: $ => seq(
            token.immediate("header"),
            "(",
            $.text_content,
            ")"
        ),
        footer_modifier: $ => seq(
            token.immediate("footer"),
            "(",
            $.text_content,
            ")"
        ),
        
        width_modifier: $ => seq(
            token.immediate("width"),
            "(",
            $.expression,
            ")"
        ),
        height_modifier: $ => seq(
            token.immediate("height"),
            "(",
            $.expression,
            ")"
        ),
        
        layout_modifier: $ => seq(
            token.immediate("layout"),
            "(",
            $.alignment_type,
            ")"
        ),
        
        padding_modifier: $ => seq(
            token.immediate("padding"),
            "(",
            $.expression,
            optional(
                seq(
                  ",",
                  $.edge_type
                )
            ),
            ")"
        ),
        
        offset_modifier: $ => seq(
            token.immediate("offset"),
            "(",
            $.expression,
            optional(
                seq(
                  ",",
                  $.axis_type
                )
            ),
            ")"
        ),
        
        margin_modifier: $ => seq(
            token.immediate("margin"),
            "(",
            $.expression,
            optional(
                seq(
                  ",",
                  $.edge_type
                )
            ),
            ")"
        ),
        
        enumerated_modifier: $ => seq(
            token.immediate("enumerated"),
            "(",
            $.bool_type,
            ")"
        ),
        caption_modifier: $ => seq(
            token.immediate("caption"),
            "(",
            $.text_content,
            ")"
        ),
        
        subfigure_modifier: $ => seq(
            token.immediate("subfigure"),
            "(",
            $.bool_type,
            ")"
        ),
        
        spacing_modifier: $ => seq(
            token.immediate("spacing"),
            "(",
            $.expression,
            ")"
        ),
        
        tint_modifier: $ => seq(
            token.immediate("tint"),
            "(",
            $.color_type,
            ")"
        ),
        background_modifier: $ => seq(
            token.immediate("background"),
            "(",
            $.color_type,
            ")"
        ),
        
        text_alignment_modifier: $ => seq(
            token.immediate("textAlignment"),
            "(",
            $.horizontal_alignment_type,
            ")"
        ),
        line_spacing_modifier: $ => seq(
            token.immediate("lineSpacing"),
            "(",
            $.expression,
            ")"
        ),
        
        underline_modifier: $ => seq(
            token.immediate("underline"),
            "(",
            $.line_pattern_type,
            optional(
                seq(
                  ",",
                  $.color_type
                )
            ),
            ")"
        ),
        strikethrough_modifier: $ => seq(
            token.immediate("strikethrough"),
            "(",
            $.line_pattern_type,
            optional(
                seq(
                  ",",
                  $.color_type
                )
            ),
            ")"
        ),
        
        font_size_modifier: $ => seq(
            token.immediate("fontSize"),
            "(",
            $.font_size_type,
            ")"
        ),
        font_style_modifier: $ => seq(
            token.immediate("fontStyle"),
            "(",
            $.font_style_type,
            ")"
        ),
        
        code_language_modifier: $ => seq(
            token.immediate("language"),
            "(",
            $.code_language_type,
            ")"
        ),
        code_style_modifier: $ => seq(
            token.immediate("style"),
            "(",
            $.code_style_type,
            ")"
        ),
        code_frame_modifier: $ => seq(
            token.immediate("frame"),
            "(",
            $.code_frame_type,
            ")"
        ),
        code_numbers_modifier: $ => seq(
            token.immediate("numbers"),
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
        
        constant: $ => choice(
            seq(
                "@",
                choice("width", "height", $.invalid_constant)
            ),
            $.invalid_constant
        ),
        number: $ => seq(
            $.number_type,
            optional($.measure_unit)
        ),
        measure_unit: $ => token.immediate(/pt|cm|mm|in/),
        
        number_type: $ => choice($.integer, $.decimal, $.invalid_number),
        bool_type: $ => choice("true", "false", $.invalid_constant),
        
        integer: $ => /[1-9][0-9]*/,
        decimal: $ => /([1-9][0-9]*|0)\.[0-9]+/,
        
        invalid_constant: $ => /[a-zA-Z]+/,
        invalid_number: $ => /[0]+[0-9]*(\.[0-9]+)?/,
        
        invalid_type: $ => /[a-zA-Z]+/,
        invalid_value: $ => token.immediate(/[a-zA-Z]+/),
        
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
        
        horizontal_alignment_type: $ => choice(
            seq(".", $.horizontal_alignment_value),
            $.invalid_type
        ),
        horizontal_alignment_value: $ => choice(
            token.immediate("center"),
            token.immediate("leading"),
            token.immediate("trailing"),
            $.invalid_value
        ),
        
        vertical_alignment_type: $ => choice(
            seq(".", $.vertical_alignment_value),
            $.invalid_type
        ),
        vertical_alignment_value: $ => choice(
            token.immediate("center"),
            token.immediate("top"),
            token.immediate("bottom"),
            $.invalid_value
        ),
        
        alignment_type: $ => choice(
            seq(".", $.alignment_value),
            $.invalid_type
        ),
        alignment_value: $ => choice(
            token.immediate("center"),
            token.immediate("leading"),
            token.immediate("trailing"),
            token.immediate("top"),
            token.immediate("bottom"),
            token.immediate("topLeading"),
            token.immediate("topTrailing"),
            token.immediate("bottomLeading"),
            token.immediate("bottomTrailing"),
            $.invalid_value
        ),
        
        edge_type: $ => choice(
            seq(".", $.edge_value),
            $.invalid_type
        ),
        edge_value: $ => choice(
            token.immediate("top"),
            token.immediate("bottom"),
            token.immediate("leading"),
            token.immediate("trailing"),
            token.immediate("all"),
            $.invalid_value
        ),
        
        axis_type: $ => choice(
            seq(".", $.axis_value),
            $.invalid_type
        ),
        axis_value: $ => choice(
            token.immediate("vertical"),
            token.immediate("horizontal"),
            $.invalid_value
        ),
        
        color_type: $ => choice(
            seq(".", $.color_value),
            $.invalid_type
        ),
        color_value: $ => choice(
            token.immediate("red"),
            token.immediate("green"),
            token.immediate("blue"),
            token.immediate("cyan"),
            token.immediate("magenta"),
            token.immediate("yellow"),
            token.immediate("black"),
            token.immediate("gray"),
            token.immediate("white"),
            token.immediate("darkGray"),
            token.immediate("lightGray"),
            token.immediate("brown"),
            token.immediate("lime"),
            token.immediate("olive"),
            token.immediate("orange"),
            token.immediate("pink"),
            token.immediate("purple"),
            token.immediate("teal"),
            token.immediate("violet"),
            $.invalid_value
        ),
        
        line_pattern_type: $ => choice(
            seq(".", $.line_pattern_value),
            $.invalid_type
        ),
        line_pattern_value: $ => choice(
            token.immediate("dash"),
            token.immediate("dashDot"),
            token.immediate("dashDotDot"),
            token.immediate("dot"),
            token.immediate("solid"),
            $.invalid_value
        ),
        
        font_size_type: $ => choice(
            seq(".", $.font_size_value),
            $.invalid_type
        ),
        font_size_value: $ => choice(
            token.immediate("tiny"),
            token.immediate("script"),
            token.immediate("footnote"),
            token.immediate("small"),
            token.immediate("normal"),
            token.immediate("large"),
            token.immediate("larger"),
            token.immediate("largest"),
            token.immediate("huge"),
            token.immediate("hugest"),
            $.invalid_value
        ),
        
        font_style_type: $ => choice(
            seq(".", $.font_style_value),
            $.invalid_type
        ),
        font_style_value: $ => choice(
            token.immediate("medium"),
            token.immediate("bold"),
            token.immediate("italic"),
            token.immediate("monospaced"),
            token.immediate("smallCaps"),
            $.invalid_value
        ),
        
        code_language_type: $ => choice(
            seq(".", $.code_language_value),
            $.invalid_type
        ),
        code_language_value: $ => choice(
            token.immediate("cucumber"),
            token.immediate("abap"),
            token.immediate("ada"),
            token.immediate("ahk"),
            token.immediate("antlr"),
            token.immediate("apacheconf"),
            token.immediate("applescript"),
            token.immediate("as"),
            token.immediate("aspectj"),
            token.immediate("autoit"),
            token.immediate("asy"),
            token.immediate("awk"),
            token.immediate("basemake"),
            token.immediate("bash"),
            token.immediate("bat"),
            token.immediate("bbcode"),
            token.immediate("befunge"),
            token.immediate("bmax"),
            token.immediate("boo"),
            token.immediate("brainfuck"),
            token.immediate("bro"),
            token.immediate("bugs"),
            token.immediate("c"),
            token.immediate("ceylon"),
            token.immediate("cfm"),
            token.immediate("cfs"),
            token.immediate("cheetah"),
            token.immediate("clj"),
            token.immediate("cmake"),
            token.immediate("cobol"),
            token.immediate("cl"),
            token.immediate("console"),
            token.immediate("control"),
            token.immediate("coq"),
            token.immediate("cpp"),
            token.immediate("croc"),
            token.immediate("csharp"),
            token.immediate("css"),
            token.immediate("cuda"),
            token.immediate("cyx"),
            token.immediate("d"),
            token.immediate("dg"),
            token.immediate("diff"),
            token.immediate("django"),
            token.immediate("dpatch"),
            token.immediate("duel"),
            token.immediate("dylan"),
            token.immediate("ec"),
            token.immediate("erb"),
            token.immediate("evoque"),
            token.immediate("fan"),
            token.immediate("fancy"),
            token.immediate("fortran"),
            token.immediate("gas"),
            token.immediate("genshi"),
            token.immediate("glsl"),
            token.immediate("gnuplot"),
            token.immediate("go"),
            token.immediate("gosu"),
            token.immediate("groovy"),
            token.immediate("gst"),
            token.immediate("haml"),
            token.immediate("haskell"),
            token.immediate("hxml"),
            token.immediate("html"),
            token.immediate("http"),
            token.immediate("hx"),
            token.immediate("idl"),
            token.immediate("irc"),
            token.immediate("ini"),
            token.immediate("java"),
            token.immediate("jade"),
            token.immediate("js"),
            token.immediate("json"),
            token.immediate("jsp"),
            token.immediate("kconfig"),
            token.immediate("koka"),
            token.immediate("lasso"),
            token.immediate("livescrit"),
            token.immediate("llvm"),
            token.immediate("logos"),
            token.immediate("lua"),
            token.immediate("mako"),
            token.immediate("mason"),
            token.immediate("matlab"),
            token.immediate("minid"),
            token.immediate("monkey"),
            token.immediate("moon"),
            token.immediate("mxml"),
            token.immediate("myghty"),
            token.immediate("mysql"),
            token.immediate("nasm"),
            token.immediate("newlisp"),
            token.immediate("newspeak"),
            token.immediate("numpy"),
            token.immediate("ocaml"),
            token.immediate("octave"),
            token.immediate("ooc"),
            token.immediate("perl"),
            token.immediate("php"),
            token.immediate("plpgsql"),
            token.immediate("postgresql"),
            token.immediate("postscript"),
            token.immediate("pot"),
            token.immediate("prolog"),
            token.immediate("psql"),
            token.immediate("puppet"),
            token.immediate("python"),
            token.immediate("qml"),
            token.immediate("ragel"),
            token.immediate("raw"),
            token.immediate("ruby"),
            token.immediate("rhtml"),
            token.immediate("sass"),
            token.immediate("scheme"),
            token.immediate("smalltalk"),
            token.immediate("sql"),
            token.immediate("ssp"),
            token.immediate("tcl"),
            token.immediate("tea"),
            token.immediate("tex"),
            token.immediate("text"),
            token.immediate("vala"),
            token.immediate("vgl"),
            token.immediate("xml"),
            token.immediate("xquery"),
            token.immediate("yaml"),
            $.invalid_value
        ),
        
        code_style_type: $ => choice(
            seq(".", $.code_style_value),
            $.invalid_type
        ),
        code_style_value: $ => choice(
            token.immediate("manni"),
            token.immediate("fruity"),
            token.immediate("rrt"),
            token.immediate("autumn"),
            token.immediate("perldoc"),
            token.immediate("bw"),
            token.immediate("borland"),
            token.immediate("emacs"),
            token.immediate("colorful"),
            token.immediate("vim"),
            token.immediate("murphy"),
            token.immediate("pastie"),
            token.immediate("vs"),
            token.immediate("friendly"),
            token.immediate("trac"),
            token.immediate("native"),
            token.immediate("tango"),
            token.immediate("monokai"),
            $.invalid_value
        ),
        
        code_frame_type: $ => choice(
            seq(".", $.code_frame_value),
            $.invalid_type
        ),
        code_frame_value: $ => choice(
            token.immediate("lefline"),
            token.immediate("topline"),
            token.immediate("bottomline"),
            token.immediate("lines"),
            token.immediate("single"),
            $.invalid_value
        )
    }
})
