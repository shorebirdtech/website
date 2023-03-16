import 'dart:io';

import 'package:markdown/markdown.dart';

String findTitle(List<Node> nodes) {
  for (var node in nodes) {
    if (node is Element && node.tag == 'h1') {
      return node.textContent;
    }
  }
  return '';
}

String renderWithVariables(String template, Map<String, String> variables) {
  var result = template;
  for (var key in variables.keys) {
    result = result.replaceAll('{{$key}}', variables[key]!);
  }
  return result;
}

void main(List<String> arguments) {
  if (arguments.length != 1) {
    print('Usage: render <file>');
    return;
  }

  final inPath = arguments[0];
  final outPath = inPath.replaceAll('.md', '.html');

  final file = File(inPath);
  if (!file.existsSync()) {
    print('File not found: ${file.path}');
    return;
  }
  final markdown = file.readAsStringSync();
  final document = Document(
    extensionSet: ExtensionSet.gitHubWeb,
  );

  final nodes = document.parse(markdown);

  final templatePath = 'TEMPLATE.html';
  final templateFile = File(templatePath);
  final template = templateFile.readAsStringSync();

  final html = renderWithVariables(template, {
    'content': renderToHtml(nodes),
    'title': findTitle(nodes),
  });
  final htmlWithComment =
      '<!-- Do not edit directly, generated from ${file.path} -->\n$html';

  final outFile = File(outPath);
  outFile.writeAsStringSync(htmlWithComment);
}
