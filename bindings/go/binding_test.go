package tree_sitter_pageflow_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_pageflow "github.com/vsevolond/tree-sitter-pageflow/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_pageflow.Language())
	if language == nil {
		t.Errorf("Error loading PageFlow grammar")
	}
}
