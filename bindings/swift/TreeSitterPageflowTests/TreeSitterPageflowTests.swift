import XCTest
import SwiftTreeSitter
import TreeSitterPageflow

final class TreeSitterPageflowTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_pageflow())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading PageFlow grammar")
    }
}
